namespace Backend.Models.DTOs
{
    public class SubmissionUploadRequest
    {
        public IFormFile File { get; set; } = null!;
        public string StudentId { get; set; } = string.Empty;
        public string ClassId { get; set; } = string.Empty;
        public string AssignmentId { get; set; } = string.Empty;
    }
}
