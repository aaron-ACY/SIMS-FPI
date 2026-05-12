using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class Department
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("name")]
        public string Name { get; set; } = string.Empty;

        [Name("head_teacher_id")]
        public string HeadTeacherId { get; set; } = string.Empty;

        [Name("start_date")]
        public string StartDate { get; set; } = string.Empty;
    }
}