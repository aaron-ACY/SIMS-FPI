using Backend.Models.Validators;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Auth;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthPortalController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthPortalController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var validator = new LoginRequestValidator();
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return BadRequest(new
                {
                    errors = validationResult.Errors.Select(e => e.ErrorMessage)
                });
            }

            var response = _authService.Authenticate(request);

            if (response == null)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác." });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công!",
                data = response
            });
        }

        // POST: api/auth/change-password
        [Authorize]
        [HttpPost("change-password")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (request.NewPassword != request.ConfirmNewPassword)
            {
                return BadRequest(new { message = "Mật khẩu mới và xác nhận mật khẩu không khớp." });
            }

            if (request.NewPassword.Length < 6)
            {
                return BadRequest(new { message = "Mật khẩu mới phải có ít nhất 6 ký tự." });
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "Không xác định được người dùng." });
            }

            var result = _authService.ChangePassword(userId, request.CurrentPassword, request.NewPassword);
            if (!result)
            {
                return BadRequest(new { message = "Mật khẩu hiện tại không chính xác." });
            }

            return Ok(new { message = "Đổi mật khẩu thành công!" });
        }
    }
}