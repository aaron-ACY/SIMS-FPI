using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class Assignment
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("class_subject_detail_id")]
        public string ClassSubjectDetailId { get; set; } = string.Empty;

        [Name("title")]
        public string Title { get; set; } = string.Empty;

        [Name("description")]
        public string Description { get; set; } = string.Empty;

        [Name("due_date")]
        public string DueDate { get; set; } = string.Empty;
    }
}