namespace Backend.Models.DTOs.Admin
{
    public class CreateAccountRequest
    {
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        /// <summary>
        /// "Instructor" hoặc "Student"
        /// </summary>
        public string Role { get; set; } = string.Empty;

        // --- Thông tin bổ sung cho profile ---
        public string Gender { get; set; } = string.Empty;
        public string DateOfBirth { get; set; } = string.Empty;

        // Chỉ dùng cho Instructor
        public string DepartmentId { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Qualification { get; set; } = string.Empty;
        public string Experience { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
    }
}
