using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class StudentClass
    {
        [Name("enrollment_id")]
        public string EnrollmentId { get; set; } = string.Empty;

        [Name("class_id")]
        public string ClassId { get; set; } = string.Empty;

        [Name("student_id")]
        public string StudentId { get; set; } = string.Empty;

        [Name("joined_date")]
        public string JoinedDate { get; set; } = string.Empty;
    }
}