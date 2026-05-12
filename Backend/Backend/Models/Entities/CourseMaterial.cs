using CsvHelper.Configuration.Attributes;

namespace Backend.Models.Entities
{
    public class CourseMaterial
    {
        [Name("id")]
        public string Id { get; set; } = string.Empty;

        [Name("class_subject_detail_id")]
        public string ClassSubjectDetailId { get; set; } = string.Empty;

        [Name("title")]
        public string Title { get; set; } = string.Empty;

        [Name("file_path")]
        public string FilePath { get; set; } = string.Empty;

        [Name("video_url")]
        public string VideoUrl { get; set; } = string.Empty;

        [Name("category")]
        public string Category { get; set; } = string.Empty;

        [Name("upload_date")]
        public string UploadDate { get; set; } = string.Empty;
    }
}