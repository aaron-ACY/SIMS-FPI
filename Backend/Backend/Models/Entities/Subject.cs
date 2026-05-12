using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class Subject
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("name")]
        public string Name { get; set; } = string.Empty;

        [Name("department_id")]
        public string DepartmentId { get; set; } = string.Empty;

        [Name("credits")]
        public int Credits { get; set; }
    }
}