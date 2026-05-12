namespace Backend.Models.DTOs
{
    public class LoginResponse
    {
        public string AccessToken { get; set; } = string.Empty;
        public bool Success { get; set; }
    }
}