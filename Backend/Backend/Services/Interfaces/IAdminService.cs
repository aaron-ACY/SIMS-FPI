using Backend.Models.DTOs.Admin;
using Backend.Models.Entities;

namespace Backend.Services.Interfaces
{
    public interface IAdminService
    {
        // Department
        List<Department> GetAllDepartments();
        Department? GetDepartmentById(string id);
        Department CreateDepartment(CreateDepartmentRequest request);
        Department? UpdateDepartment(string id, UpdateDepartmentRequest request);
        bool DeleteDepartment(string id);

        // Subject
        List<Subject> GetAllSubjects();
        Subject? GetSubjectById(string id);
        Subject CreateSubject(CreateSubjectRequest request);
        Subject? UpdateSubject(string id, UpdateSubjectRequest request);
        bool DeleteSubject(string id);

        // Class
        List<ClassEntity> GetAllClasses();
        ClassEntity? GetClassById(string id);
        ClassEntity CreateClass(CreateClassRequest request);
        ClassEntity? UpdateClass(string id, UpdateClassRequest request);
        bool DeleteClass(string id);

        // Assignment: Phân công GV & Quản lý SV trong lớp
        ClassSubject AssignInstructor(AssignInstructorRequest request);
        bool RemoveInstructorAssignment(string classSubjectDetailId);
        List<ClassSubject> GetAllClassSubjectDetails();

        StudentClass AddStudentToClass(AddStudentToClassRequest request);
        bool RemoveStudentFromClass(string classId, string studentId);
        List<StudentClass> GetStudentsInClass(string classId);

        // Account
        object CreateAccount(CreateAccountRequest request);
    }
}
