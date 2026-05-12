using Backend.Models.DTOs.Student;
using Backend.Models.Entities;

namespace Backend.Services.Interfaces
{
    public interface IStudentService
    {
        // Profile
        object? GetProfile(string userId);
        object? UpdateProfile(string userId, UpdateProfileRequest request);

        // Lớp & Môn học
        List<object> GetMyClasses(string studentId);
        List<object> GetMySubjects(string studentId);
        List<CourseMaterial> GetMaterials(string classSubjectDetailId);

        // Bài tập & Nộp bài
        List<Assignment> GetAssignments(string classSubjectDetailId);
        Submission SubmitAssignment(string studentId, string assignmentId, IFormFile file);
        List<Submission> GetSubmissionHistory(string studentId);
        List<object> GetGrades(string studentId);
    }
}
