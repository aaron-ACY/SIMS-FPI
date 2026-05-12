namespace Backend.Models.DTOs.Admin
{
    public class CreateClassRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Semester { get; set; } = string.Empty;
        public string DepartmentId { get; set; } = string.Empty;
    }

    public class UpdateClassRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Semester { get; set; } = string.Empty;
        public string DepartmentId { get; set; } = string.Empty;
    }
}
