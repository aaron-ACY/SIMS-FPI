namespace Backend.Models.DTOs.Admin
{
    // Phân công giảng viên dạy môn trong lớp
    public class AssignInstructorRequest
    {
        public string ClassId { get; set; } = string.Empty;
        public string SubjectId { get; set; } = string.Empty;
        public string TeacherId { get; set; } = string.Empty;
    }

    // Thêm sinh viên vào lớp
    public class AddStudentToClassRequest
    {
        public string ClassId { get; set; } = string.Empty;
        public string StudentId { get; set; } = string.Empty;
    }

    // Xóa sinh viên khỏi lớp
    public class RemoveStudentFromClassRequest
    {
        public string ClassId { get; set; } = string.Empty;
        public string StudentId { get; set; } = string.Empty;
    }
}
