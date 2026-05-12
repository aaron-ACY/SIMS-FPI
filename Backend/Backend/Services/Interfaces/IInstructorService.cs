using Backend.Models.DTOs.Instructor;
using Backend.Models.Entities;

namespace Backend.Services.Interfaces
{
    public interface IInstructorService
    {
        // Lớp & Sinh viên
        List<ClassSubject> GetClassesByTeacher(string teacherId);
        List<object> GetStudentsInClass(string classSubjectDetailId);

        // Tài liệu
        List<CourseMaterial> GetMaterials(string classSubjectDetailId);
        CourseMaterial? GetMaterialById(string id);
        CourseMaterial CreateMaterial(CreateCourseMaterialRequest request);
        CourseMaterial? UpdateMaterial(string id, UpdateCourseMaterialRequest request);
        bool DeleteMaterial(string id);

        // Bài tập
        List<Assignment> GetAssignments(string classSubjectDetailId);
        Assignment? GetAssignmentById(string id);
        Assignment CreateAssignment(CreateAssignmentRequest request);
        Assignment? UpdateAssignment(string id, UpdateAssignmentRequest request);
        bool DeleteAssignment(string id);

        // Chấm điểm
        List<Submission> GetSubmissions(string assignmentId);
        Submission? GradeSubmission(string submissionId, GradeSubmissionRequest request);
    }
}
