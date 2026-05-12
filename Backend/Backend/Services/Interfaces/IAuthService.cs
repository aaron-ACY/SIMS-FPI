using Backend.Models.DTOs;

namespace Backend.Services.Interfaces
{
    public interface IAuthService
    {
        LoginResponse? Authenticate(LoginRequest request);
        bool ChangePassword(string userId, string currentPassword, string newPassword);
    }
}