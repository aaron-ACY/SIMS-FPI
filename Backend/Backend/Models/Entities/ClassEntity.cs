using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class ClassEntity
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("name")]
        public string Name { get; set; } = string.Empty;

        [Name("semester")]
        public string Semester { get; set; } = string.Empty;

        [Name("department_id")]
        public string DepartmentId { get; set; } = string.Empty;
    }
}
