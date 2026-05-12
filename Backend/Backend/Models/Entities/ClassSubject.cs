using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class ClassSubject
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("class_id")]
        public string ClassId { get; set; } = string.Empty;

        [Name("subject_id")]
        public string SubjectId { get; set; } = string.Empty;

        [Name("teacher_id")]
        public string TeacherId { get; set; } = string.Empty;

        [Name("status")]
        public string Status { get; set; } = string.Empty;
    }
}