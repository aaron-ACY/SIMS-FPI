namespace Backend.Models.DTOs.Admin
{
    public class CreateSubjectRequest
    {
        public string Name { get; set; } = string.Empty;
        public string DepartmentId { get; set; } = string.Empty;
        public int Credits { get; set; }
    }

    public class UpdateSubjectRequest
    {
        public string Name { get; set; } = string.Empty;
        public string DepartmentId { get; set; } = string.Empty;
        public int Credits { get; set; }
    }
}
