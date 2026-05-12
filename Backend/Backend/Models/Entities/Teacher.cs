using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class Teacher
    {
        [Name("id")]
        public string TeacherId { get; set; } = string.Empty;

        [Name("user_id")]
        public string UserId { get; set; } = string.Empty;

        [Name("department_id")]
        public string DepartmentId { get; set; } = string.Empty;

        [Name("gender")]
        public string Gender { get; set; } = string.Empty;

        [Name("date_of_birth")]
        public string DateOfBirth { get; set; } = string.Empty;

        [Name("phone")]
        public string Mobile { get; set; } = string.Empty;

        [Name("qualification")]
        public string Qualification { get; set; } = string.Empty;

        [Name("experience")]
        public string Experience { get; set; } = string.Empty;

        [Name("address")]
        public string Address { get; set; } = string.Empty;

        [Name("city")]
        public string City { get; set; } = string.Empty;

        [Name("image_path")]
        public string ImagePath { get; set; } = string.Empty;
    }
}