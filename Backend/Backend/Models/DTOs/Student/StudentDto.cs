namespace Backend.Models.DTOs.Student
{
    // Cập nhật thông tin cá nhân
    public class UpdateProfileRequest
    {
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public string? ImagePath { get; set; }
        public string? FullName { get; set; }
    }

    // Upload bài nộp — dùng DTO bọc IFormFile để Swagger nhận diện đúng
    public class SubmitAssignmentFormRequest
    {
        public IFormFile File { get; set; } = null!;
    }
}
