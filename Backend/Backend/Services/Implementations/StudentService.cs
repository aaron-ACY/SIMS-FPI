using Backend.Data;
using Backend.Models.DTOs.Student;
using Backend.Models.Entities;
using Backend.Services.Interfaces;

namespace Backend.Services.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly ICsvService _csv;
        private readonly CsvDbContext _ctx;

        public StudentService(ICsvService csv, CsvDbContext ctx)
        {
            _csv = csv;
            _ctx = ctx;
        }

        // ======================== PROFILE ========================

        public object? GetProfile(string userId)
        {
            var user = _csv.ReadAll<User>(_ctx.UsersPath).FirstOrDefault(u => u.Id == userId);
            if (user == null) return null;

            var student = _csv.ReadAll<Student>(_ctx.StudentsPath).FirstOrDefault(s => s.UserId == userId);

            return new
            {
                user.Id,
                user.Email,
                user.FullName,
                user.Role,
                StudentId = student?.StudentId ?? "",
                Gender = student?.Gender ?? "",
                DateOfBirth = student?.DateOfBirth ?? "",
                ImagePath = student?.ImagePath ?? ""
            };
        }

        public object? UpdateProfile(string userId, UpdateProfileRequest request)
        {
            var student = _csv.ReadAll<Student>(_ctx.StudentsPath).FirstOrDefault(s => s.UserId == userId);
            if (student == null) return null;

            // Cập nhật Student profile
            if (request.Gender != null) student.Gender = request.Gender;
            if (request.DateOfBirth != null) student.DateOfBirth = request.DateOfBirth;
            if (request.ImagePath != null) student.ImagePath = request.ImagePath;

            _csv.UpdateRecords<Student>(_ctx.StudentsPath, s => s.UserId == userId, student);

            // Cập nhật FullName trong User nếu có
            if (!string.IsNullOrEmpty(request.FullName))
            {
                var user = _csv.ReadAll<User>(_ctx.UsersPath).FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    user.FullName = request.FullName;
                    _csv.UpdateRecords<User>(_ctx.UsersPath, u => u.Id == userId, user);
                }
            }

            return GetProfile(userId);
        }

        // ======================== LỚP HỌC ========================

        public List<object> GetMyClasses(string studentId)
        {
            var studentClasses = _csv.ReadAll<StudentClass>(_ctx.StudentClassesPath)
                .Where(sc => sc.StudentId == studentId).ToList();

            var classes = _csv.ReadAll<ClassEntity>(_ctx.ClassesPath);

            return studentClasses.Select(sc =>
            {
                var cls = classes.FirstOrDefault(c => c.Id == sc.ClassId);
                return (object)new
                {
                    sc.EnrollmentId,
                    sc.ClassId,
                    ClassName = cls?.Name ?? "",
                    Semester = cls?.Semester ?? "",
                    DepartmentId = cls?.DepartmentId ?? "",
                    sc.JoinedDate
                };
            }).ToList();
        }

        // ======================== MÔN HỌC ========================

        public List<object> GetMySubjects(string studentId)
        {
            var enrollments = _csv.ReadAll<StudentSubjectEnrollment>(_ctx.StudentSubjectEnrollmentsPath)
                .Where(e => e.StudentId == studentId).ToList();

            var classSubjects = _csv.ReadAll<ClassSubject>(_ctx.ClassSubjectDetailsPath);
            var subjects = _csv.ReadAll<Subject>(_ctx.SubjectsPath);
            var teachers = _csv.ReadAll<Teacher>(_ctx.TeachersPath);
            var users = _csv.ReadAll<User>(_ctx.UsersPath);

            return enrollments.Select(e =>
            {
                var csd = classSubjects.FirstOrDefault(cs => cs.Id == e.ClassSubjectDetailId);
                var subject = csd != null ? subjects.FirstOrDefault(s => s.Id == csd.SubjectId) : null;
                var teacher = csd != null ? teachers.FirstOrDefault(t => t.TeacherId == csd.TeacherId) : null;
                var teacherUser = teacher != null ? users.FirstOrDefault(u => u.Id == teacher.UserId) : null;

                return (object)new
                {
                    e.Id,
                    e.ClassSubjectDetailId,
                    SubjectId = subject?.Id ?? "",
                    SubjectName = subject?.Name ?? "",
                    Credits = subject?.Credits ?? 0,
                    TeacherName = teacherUser?.FullName ?? "",
                    e.Status,
                    e.EnrolledAt
                };
            }).ToList();
        }

        // ======================== TÀI LIỆU ========================

        public List<CourseMaterial> GetMaterials(string classSubjectDetailId)
        {
            return _csv.ReadAll<CourseMaterial>(_ctx.CourseMaterialsPath)
                .Where(m => m.ClassSubjectDetailId == classSubjectDetailId).ToList();
        }

        // ======================== BÀI TẬP ========================

        public List<Assignment> GetAssignments(string classSubjectDetailId)
        {
            return _csv.ReadAll<Assignment>(_ctx.AssignmentsPath)
                .Where(a => a.ClassSubjectDetailId == classSubjectDetailId).ToList();
        }

        public Submission SubmitAssignment(string studentId, string assignmentId, IFormFile file)
        {
            // Tạo thư mục upload
            string uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "submissions");
            if (!Directory.Exists(uploadDir)) Directory.CreateDirectory(uploadDir);

            // Lưu file
            string fileName = $"{studentId}_{assignmentId}_{DateTime.Now:yyyyMMddHHmmss}{Path.GetExtension(file.FileName)}";
            string filePath = Path.Combine(uploadDir, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            var all = _csv.ReadAll<Submission>(_ctx.SubmissionsPath);
            int nextNum = all.Count == 0 ? 1000000 : all.Max(s => int.TryParse(s.SubmissionId.Replace("SUB", ""), out int v) ? v : 0) + 1;

            var submission = new Submission
            {
                SubmissionId = $"SUB{nextNum:D7}",
                AssignmentId = assignmentId,
                StudentId = studentId,
                ContentUrl = $"/uploads/submissions/{fileName}",
                SubmissionDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                Grade = "",
                TeacherComments = ""
            };
            _csv.AppendRecord(_ctx.SubmissionsPath, submission);
            return submission;
        }

        public List<Submission> GetSubmissionHistory(string studentId)
        {
            return _csv.ReadAll<Submission>(_ctx.SubmissionsPath)
                .Where(s => s.StudentId == studentId).ToList();
        }

        public List<object> GetGrades(string studentId)
        {
            var submissions = _csv.ReadAll<Submission>(_ctx.SubmissionsPath)
                .Where(s => s.StudentId == studentId && !string.IsNullOrEmpty(s.Grade)).ToList();

            var assignments = _csv.ReadAll<Assignment>(_ctx.AssignmentsPath);

            return submissions.Select(s =>
            {
                var assignment = assignments.FirstOrDefault(a => a.Id == s.AssignmentId);
                double.TryParse(s.Grade, out double grade);
                string rank = grade >= 90 ? "D (Distinction)" :
                              grade >= 80 ? "M (Merit)" :
                              grade >= 65 ? "P (Pass)" : "F (Fail)";

                return (object)new
                {
                    s.SubmissionId,
                    s.AssignmentId,
                    AssignmentTitle = assignment?.Title ?? "",
                    s.Grade,
                    Rank = rank,
                    s.TeacherComments,
                    s.SubmissionDate
                };
            }).ToList();
        }
    }
}
