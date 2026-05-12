using Backend.Data;
using Backend.Models.DTOs.Instructor;
using Backend.Models.Entities;
using Backend.Services.Interfaces;

namespace Backend.Services.Implementations
{
    public class InstructorService : IInstructorService
    {
        private readonly ICsvService _csv;
        private readonly CsvDbContext _ctx;

        public InstructorService(ICsvService csv, CsvDbContext ctx)
        {
            _csv = csv;
            _ctx = ctx;
        }

        // ======================== LỚP & SINH VIÊN ========================

        public List<ClassSubject> GetClassesByTeacher(string teacherId)
        {
            return _csv.ReadAll<ClassSubject>(_ctx.ClassSubjectDetailsPath)
                .Where(cs => cs.TeacherId == teacherId)
                .ToList();
        }

        public List<object> GetStudentsInClass(string classSubjectDetailId)
        {
            // Lấy ClassSubjectDetail để tìm classId
            var csd = _csv.ReadAll<ClassSubject>(_ctx.ClassSubjectDetailsPath)
                .FirstOrDefault(cs => cs.Id == classSubjectDetailId);
            if (csd == null) return new List<object>();

            var studentClasses = _csv.ReadAll<StudentClass>(_ctx.StudentClassesPath)
                .Where(sc => sc.ClassId == csd.ClassId).ToList();

            var students = _csv.ReadAll<Student>(_ctx.StudentsPath);
            var users = _csv.ReadAll<User>(_ctx.UsersPath);

            var enrollments = _csv.ReadAll<StudentSubjectEnrollment>(_ctx.StudentSubjectEnrollmentsPath)
                .Where(e => e.ClassSubjectDetailId == classSubjectDetailId).ToList();

            return studentClasses.Select(sc =>
            {
                var student = students.FirstOrDefault(s => s.StudentId == sc.StudentId);
                var user = student != null ? users.FirstOrDefault(u => u.Id == student.UserId) : null;
                var enrollment = enrollments.FirstOrDefault(e => e.StudentId == sc.StudentId);
                return (object)new
                {
                    sc.StudentId,
                    FullName = user?.FullName ?? "",
                    Email = user?.Email ?? "",
                    student?.Gender,
                    EnrollmentStatus = enrollment?.Status ?? "N/A",
                    sc.JoinedDate
                };
            }).ToList();
        }

        // ======================== TÀI LIỆU ========================

        public List<CourseMaterial> GetMaterials(string classSubjectDetailId)
        {
            return _csv.ReadAll<CourseMaterial>(_ctx.CourseMaterialsPath)
                .Where(m => m.ClassSubjectDetailId == classSubjectDetailId).ToList();
        }

        public CourseMaterial? GetMaterialById(string id)
            => _csv.ReadAll<CourseMaterial>(_ctx.CourseMaterialsPath).FirstOrDefault(m => m.Id == id);

        public CourseMaterial CreateMaterial(CreateCourseMaterialRequest request)
        {
            var all = _csv.ReadAll<CourseMaterial>(_ctx.CourseMaterialsPath);
            int nextNum = all.Count == 0 ? 10000 : all.Max(m => int.TryParse(m.Id.Replace("CM", ""), out int v) ? v : 0) + 1;

            var material = new CourseMaterial
            {
                Id = $"CM{nextNum:D5}",
                ClassSubjectDetailId = request.ClassSubjectDetailId,
                Title = request.Title,
                FilePath = request.FilePath,
                VideoUrl = request.VideoUrl,
                Category = request.Category,
                UploadDate = DateTime.Now.ToString("yyyy-MM-dd")
            };
            _csv.AppendRecord(_ctx.CourseMaterialsPath, material);
            return material;
        }

        public CourseMaterial? UpdateMaterial(string id, UpdateCourseMaterialRequest request)
        {
            var existing = GetMaterialById(id);
            if (existing == null) return null;

            existing.Title = request.Title;
            existing.FilePath = request.FilePath;
            existing.VideoUrl = request.VideoUrl;
            existing.Category = request.Category;

            _csv.UpdateRecords<CourseMaterial>(_ctx.CourseMaterialsPath, m => m.Id == id, existing);
            return existing;
        }

        public bool DeleteMaterial(string id)
        {
            if (GetMaterialById(id) == null) return false;
            _csv.DeleteRecords<CourseMaterial>(_ctx.CourseMaterialsPath, m => m.Id == id);
            return true;
        }

        // ======================== BÀI TẬP ========================

        public List<Assignment> GetAssignments(string classSubjectDetailId)
        {
            return _csv.ReadAll<Assignment>(_ctx.AssignmentsPath)
                .Where(a => a.ClassSubjectDetailId == classSubjectDetailId).ToList();
        }

        public Assignment? GetAssignmentById(string id)
            => _csv.ReadAll<Assignment>(_ctx.AssignmentsPath).FirstOrDefault(a => a.Id == id);

        public Assignment CreateAssignment(CreateAssignmentRequest request)
        {
            var all = _csv.ReadAll<Assignment>(_ctx.AssignmentsPath);
            int nextNum = all.Count == 0 ? 10000 : all.Max(a => int.TryParse(a.Id.Replace("ASG", ""), out int v) ? v : 0) + 1;

            var assignment = new Assignment
            {
                Id = $"ASG{nextNum:D5}",
                ClassSubjectDetailId = request.ClassSubjectDetailId,
                Title = request.Title,
                Description = request.Description,
                DueDate = request.DueDate
            };
            _csv.AppendRecord(_ctx.AssignmentsPath, assignment);
            return assignment;
        }

        public Assignment? UpdateAssignment(string id, UpdateAssignmentRequest request)
        {
            var existing = GetAssignmentById(id);
            if (existing == null) return null;

            existing.Title = request.Title;
            existing.Description = request.Description;
            existing.DueDate = request.DueDate;

            _csv.UpdateRecords<Assignment>(_ctx.AssignmentsPath, a => a.Id == id, existing);
            return existing;
        }

        public bool DeleteAssignment(string id)
        {
            if (GetAssignmentById(id) == null) return false;
            _csv.DeleteRecords<Assignment>(_ctx.AssignmentsPath, a => a.Id == id);
            return true;
        }

        // ======================== CHẤM ĐIỂM ========================

        public List<Submission> GetSubmissions(string assignmentId)
        {
            var submissions = _csv.ReadAll<Submission>(_ctx.SubmissionsPath)
                .Where(s => s.AssignmentId == assignmentId).ToList();

            var users = _csv.ReadAll<User>(_ctx.UsersPath);
            foreach (var sub in submissions)
            {
                var user = users.FirstOrDefault(u => u.Id == sub.StudentId);
                sub.FileName = user?.FullName ?? sub.StudentId;
            }
            return submissions;
        }

        public Submission? GradeSubmission(string submissionId, GradeSubmissionRequest request)
        {
            var existing = _csv.ReadAll<Submission>(_ctx.SubmissionsPath)
                .FirstOrDefault(s => s.SubmissionId == submissionId);
            if (existing == null) return null;

            existing.Grade = request.Grade;
            existing.TeacherComments = request.TeacherComments;

            _csv.UpdateRecords<Submission>(_ctx.SubmissionsPath, s => s.SubmissionId == submissionId, existing);
            return existing;
        }
    }
}
