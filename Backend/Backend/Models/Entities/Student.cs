using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class Student
    {
        [Name("id")]
        public string StudentId { get; set; } = string.Empty;

        [Name("user_id")]
        public string UserId { get; set; } = string.Empty;

        [Name("gender")]
        public string Gender { get; set; } = string.Empty;

        [Name("date_of_birth")]
        public string DateOfBirth { get; set; } = string.Empty;

        [Name("image_path")]
        public string ImagePath { get; set; } = string.Empty;
    }
}