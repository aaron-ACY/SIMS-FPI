public class SubmissionResponseDto
{
    public string SubmissionId { get; set; }
    public double? Grade { get; set; }

    public string Rank
    {
        get
        {
            if (!Grade.HasValue) return "Chưa chấm";
            if (Grade >= 90) return "D (Distinction)";
            if (Grade >= 80) return "M (Merit)";
            if (Grade >= 65) return "P (Pass)";
            return "F (Fail)";
        }
    }
}