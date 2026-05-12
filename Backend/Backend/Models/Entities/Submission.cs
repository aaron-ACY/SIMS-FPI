using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class Submission
    {
        [Name("id")]
        public string SubmissionId { get; set; } = string.Empty;

        [Name("assignment_id")]
        public string AssignmentId { get; set; } = string.Empty;

        [Name("student_id")]
        public string StudentId { get; set; } = string.Empty;

        [Name("file_path")]
        public string ContentUrl { get; set; } = string.Empty;

        [Name("submission_date")]
        public string SubmissionDate { get; set; } = string.Empty;

        [Name("grade")]
        public string Grade { get; set; } = string.Empty;

        [Name("teacher_comments")]
        public string TeacherComments { get; set; } = string.Empty;

        [Ignore]
        public string? ClassId { get; set; }

        [Ignore]
        public string? FileName { get; set; }
    }
}