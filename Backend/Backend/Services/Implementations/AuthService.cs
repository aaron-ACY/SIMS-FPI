using BC = BCrypt.Net.BCrypt;
using Backend.Services.Interfaces;
using Backend.Models.DTOs;
using Backend.Models.Entities;
using Backend.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly ICsvService _csvService;
        private readonly CsvDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ICsvService csvService, CsvDbContext context, IConfiguration configuration)
        {
            _csvService = csvService;
            _context = context;
            _configuration = configuration;
        }

        public LoginResponse? Authenticate(LoginRequest request)
        {
            // Đọc toàn bộ danh sách user từ file users.csv
            var users = _csvService.ReadAll<User>(_context.UsersPath);

            // Tìm user theo Email (không phân biệt hoa thường)
            var user = users.FirstOrDefault(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase));

            if (user != null && VerifyPassword(request.Password, user.Password))
            {
                return new LoginResponse
                {
                    AccessToken = GenerateJwtToken(user),
                    Success = true
                };
            }
            return null;
        }

        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            if (string.IsNullOrWhiteSpace(storedPassword)) return false;
            try
            {
                return BC.Verify(inputPassword, storedPassword);
            }
            catch
            {
                // Hỗ trợ đăng nhập bằng mật khẩu chưa hash trong file CSV (dữ liệu mẫu)
                return inputPassword == storedPassword;
            }
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("FullName", user.FullName)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:DurationInMinutes"] ?? "30")),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ChangePassword(string userId, string currentPassword, string newPassword)
        {
            var users = _csvService.ReadAll<User>(_context.UsersPath);
            var user = users.FirstOrDefault(u => u.Id == userId);
            if (user == null) return false;

            // Xác minh mật khẩu hiện tại
            if (!VerifyPassword(currentPassword, user.Password)) return false;

            // Hash mật khẩu mới
            user.Password = BC.HashPassword(newPassword);
            user.HashAlgorithm = "bcrypt";

            _csvService.UpdateRecords<User>(_context.UsersPath, u => u.Id == userId, user);
            return true;
        }
    }
}