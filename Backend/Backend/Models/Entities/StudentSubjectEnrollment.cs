using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class StudentSubjectEnrollment
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("student_id")]
        public string StudentId { get; set; } = string.Empty;

        [Name("class_subject_detail_id")]
        public string ClassSubjectDetailId { get; set; } = string.Empty;

        [Name("status")]
        public string Status { get; set; } = string.Empty;

        [Name("enrolled_at")]
        public string EnrolledAt { get; set; } = string.Empty;
    }
}
