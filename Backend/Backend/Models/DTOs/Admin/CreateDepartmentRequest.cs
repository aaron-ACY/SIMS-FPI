namespace Backend.Models.DTOs.Admin
{
    public class CreateDepartmentRequest
    {
        public string Name { get; set; } = string.Empty;
        public string HeadTeacherId { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
    }

    public class UpdateDepartmentRequest
    {
        public string Name { get; set; } = string.Empty;
        public string HeadTeacherId { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
    }
}
