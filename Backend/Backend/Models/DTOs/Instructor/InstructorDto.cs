namespace Backend.Models.DTOs.Instructor
{
    // Tạo/Cập nhật bài tập
    public class CreateAssignmentRequest
    {
        public string ClassSubjectDetailId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DueDate { get; set; } = string.Empty;
    }

    public class UpdateAssignmentRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DueDate { get; set; } = string.Empty;
    }

    // Tạo/Cập nhật tài liệu
    public class CreateCourseMaterialRequest
    {
        public string ClassSubjectDetailId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }

    public class UpdateCourseMaterialRequest
    {
        public string Title { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }

    // Chấm điểm
    public class GradeSubmissionRequest
    {
        public string Grade { get; set; } = string.Empty;
        public string TeacherComments { get; set; } = string.Empty;
    }
}
