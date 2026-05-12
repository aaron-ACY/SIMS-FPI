using BC = BCrypt.Net.BCrypt;
using Backend.Data;
using Backend.Helpers;
using Backend.Models.DTOs.Admin;
using Backend.Models.Entities;
using Backend.Services.Interfaces;

namespace Backend.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly ICsvService _csv;
        private readonly CsvDbContext _ctx;
        private const string DEFAULT_PASSWORD = "SIMS-FPT@2026";

        public AdminService(ICsvService csv, CsvDbContext ctx)
        {
            _csv = csv;
            _ctx = ctx;
        }

        // ======================== DEPARTMENT ========================

        public List<Department> GetAllDepartments() => _csv.ReadAll<Department>(_ctx.DepartmentsPath);

        public Department? GetDepartmentById(string id)
            => GetAllDepartments().FirstOrDefault(d => d.Id == id);

        public Department CreateDepartment(CreateDepartmentRequest request)
        {
            var all = GetAllDepartments();
            int next = all.Count + 1;
            var dept = new Department
            {
                Id = $"DEP{next:D3}",
                Name = request.Name,
                HeadTeacherId = request.HeadTeacherId,
                StartDate = string.IsNullOrEmpty(request.StartDate) ? DateTime.Now.ToString("yyyy-MM-dd") : request.StartDate
            };
            _csv.AppendRecord(_ctx.DepartmentsPath, dept);
            return dept;
        }

        public Department? UpdateDepartment(string id, UpdateDepartmentRequest request)
        {
            var existing = GetDepartmentById(id);
            if (existing == null) return null;

            existing.Name = request.Name;
            existing.HeadTeacherId = request.HeadTeacherId;
            existing.StartDate = request.StartDate;

            _csv.UpdateRecords<Department>(_ctx.DepartmentsPath, d => d.Id == id, existing);
            return existing;
        }

        public bool DeleteDepartment(string id)
        {
            if (GetDepartmentById(id) == null) return false;
            _csv.DeleteRecords<Department>(_ctx.DepartmentsPath, d => d.Id == id);
            return true;
        }

        // ======================== SUBJECT ========================

        public List<Subject> GetAllSubjects() => _csv.ReadAll<Subject>(_ctx.SubjectsPath);

        public Subject? GetSubjectById(string id)
            => GetAllSubjects().FirstOrDefault(s => s.Id == id);

        public Subject CreateSubject(CreateSubjectRequest request)
        {
            var all = GetAllSubjects();
            int nextNum = all.Count == 0 ? 1000 : all.Max(s => int.TryParse(s.Id, out int v) ? v : 0) + 1;
            var subject = new Subject
            {
                Id = nextNum.ToString(),
                Name = request.Name,
                DepartmentId = request.DepartmentId,
                Credits = request.Credits
            };
            _csv.AppendRecord(_ctx.SubjectsPath, subject);
            return subject;
        }

        public Subject? UpdateSubject(string id, UpdateSubjectRequest request)
        {
            var existing = GetSubjectById(id);
            if (existing == null) return null;

            existing.Name = request.Name;
            existing.DepartmentId = request.DepartmentId;
            existing.Credits = request.Credits;

            _csv.UpdateRecords<Subject>(_ctx.SubjectsPath, s => s.Id == id, existing);
            return existing;
        }

        public bool DeleteSubject(string id)
        {
            if (GetSubjectById(id) == null) return false;
            _csv.DeleteRecords<Subject>(_ctx.SubjectsPath, s => s.Id == id);
            return true;
        }

        // ======================== CLASS ========================

        public List<ClassEntity> GetAllClasses() => _csv.ReadAll<ClassEntity>(_ctx.ClassesPath);

        public ClassEntity? GetClassById(string id)
            => GetAllClasses().FirstOrDefault(c => c.Id == id);

        public ClassEntity CreateClass(CreateClassRequest request)
        {
            var all = GetAllClasses();
            int nextNum = all.Count == 0 ? 1000 : all.Max(c => int.TryParse(c.Id.Replace("C", ""), out int v) ? v : 0) + 1;
            var cls = new ClassEntity
            {
                Id = $"C{nextNum:D4}",
                Name = request.Name,
                Semester = request.Semester,
                DepartmentId = request.DepartmentId
            };
            _csv.AppendRecord(_ctx.ClassesPath, cls);
            return cls;
        }

        public ClassEntity? UpdateClass(string id, UpdateClassRequest request)
        {
            var existing = GetClassById(id);
            if (existing == null) return null;

            existing.Name = request.Name;
            existing.Semester = request.Semester;
            existing.DepartmentId = request.DepartmentId;

            _csv.UpdateRecords<ClassEntity>(_ctx.ClassesPath, c => c.Id == id, existing);
            return existing;
        }

        public bool DeleteClass(string id)
        {
            if (GetClassById(id) == null) return false;
            _csv.DeleteRecords<ClassEntity>(_ctx.ClassesPath, c => c.Id == id);
            return true;
        }

        // ======================== ASSIGNMENT (Phân công GV & SV) ========================

        public List<ClassSubject> GetAllClassSubjectDetails()
            => _csv.ReadAll<ClassSubject>(_ctx.ClassSubjectDetailsPath);

        public ClassSubject AssignInstructor(AssignInstructorRequest request)
        {
            var all = GetAllClassSubjectDetails();
            // Kiểm tra trùng
            var exists = all.FirstOrDefault(cs => cs.ClassId == request.ClassId && cs.SubjectId == request.SubjectId);
            if (exists != null)
            {
                // Cập nhật giảng viên
                exists.TeacherId = request.TeacherId;
                _csv.UpdateRecords<ClassSubject>(_ctx.ClassSubjectDetailsPath, cs => cs.Id == exists.Id, exists);
                return exists;
            }

            int nextNum = all.Count == 0 ? 10000 : all.Max(cs => int.TryParse(cs.Id.Replace("CSD", ""), out int v) ? v : 0) + 1;
            var detail = new ClassSubject
            {
                Id = $"CSD{nextNum:D5}",
                ClassId = request.ClassId,
                SubjectId = request.SubjectId,
                TeacherId = request.TeacherId,
                Status = "open"
            };
            _csv.AppendRecord(_ctx.ClassSubjectDetailsPath, detail);
            return detail;
        }

        public bool RemoveInstructorAssignment(string classSubjectDetailId)
        {
            var all = GetAllClassSubjectDetails();
            if (!all.Any(cs => cs.Id == classSubjectDetailId)) return false;
            _csv.DeleteRecords<ClassSubject>(_ctx.ClassSubjectDetailsPath, cs => cs.Id == classSubjectDetailId);
            return true;
        }

        public List<StudentClass> GetStudentsInClass(string classId)
            => _csv.ReadAll<StudentClass>(_ctx.StudentClassesPath).Where(sc => sc.ClassId == classId).ToList();

        public StudentClass AddStudentToClass(AddStudentToClassRequest request)
        {
            var all = _csv.ReadAll<StudentClass>(_ctx.StudentClassesPath);
            // Kiểm tra trùng
            if (all.Any(sc => sc.ClassId == request.ClassId && sc.StudentId == request.StudentId))
                throw new InvalidOperationException("Sinh viên đã có trong lớp này.");

            int nextNum = all.Count == 0 ? 10000 : all.Max(sc => int.TryParse(sc.EnrollmentId.Replace("E", ""), out int v) ? v : 0) + 1;
            var enrollment = new StudentClass
            {
                EnrollmentId = $"E{nextNum:D5}",
                ClassId = request.ClassId,
                StudentId = request.StudentId,
                JoinedDate = DateTime.Now.ToString("yyyy-MM-dd")
            };
            _csv.AppendRecord(_ctx.StudentClassesPath, enrollment);
            return enrollment;
        }

        public bool RemoveStudentFromClass(string classId, string studentId)
        {
            var all = _csv.ReadAll<StudentClass>(_ctx.StudentClassesPath);
            if (!all.Any(sc => sc.ClassId == classId && sc.StudentId == studentId)) return false;
            _csv.DeleteRecords<StudentClass>(_ctx.StudentClassesPath, sc => sc.ClassId == classId && sc.StudentId == studentId);
            return true;
        }

        // ======================== ACCOUNT ========================

        public object CreateAccount(CreateAccountRequest request)
        {
            var users = _csv.ReadAll<User>(_ctx.UsersPath);

            // Kiểm tra email trùng
            if (users.Any(u => u.Email.Equals(request.Email, StringComparison.OrdinalIgnoreCase)))
                throw new InvalidOperationException("Email đã tồn tại trong hệ thống.");

            string hashedPassword = BC.HashPassword(DEFAULT_PASSWORD);
            string userId;

            if (request.Role == "Instructor")
            {
                userId = IdGenerator.GenerateTeacherId(users.Where(u => u.Role == "Instructor").Select(u => u.Id));
            }
            else if (request.Role == "Student")
            {
                userId = IdGenerator.GenerateStudentId(users.Where(u => u.Role == "Student").Select(u => u.Id));
            }
            else
            {
                throw new ArgumentException("Role phải là 'Instructor' hoặc 'Student'.");
            }

            // Tạo User
            var user = new User
            {
                Id = userId,
                Email = request.Email,
                Password = hashedPassword,
                Role = request.Role,
                FullName = request.FullName,
                HashAlgorithm = "bcrypt"
            };
            _csv.AppendRecord(_ctx.UsersPath, user);

            // Tạo profile tương ứng
            if (request.Role == "Instructor")
            {
                var teacher = new Teacher
                {
                    TeacherId = userId,
                    UserId = userId,
                    DepartmentId = request.DepartmentId,
                    Gender = request.Gender,
                    DateOfBirth = request.DateOfBirth,
                    Mobile = request.Phone,
                    Qualification = request.Qualification,
                    Experience = request.Experience,
                    Address = request.Address,
                    City = request.City,
                    ImagePath = ""
                };
                _csv.AppendRecord(_ctx.TeachersPath, teacher);
            }
            else
            {
                var student = new Student
                {
                    StudentId = userId,
                    UserId = userId,
                    Gender = request.Gender,
                    DateOfBirth = request.DateOfBirth,
                    ImagePath = ""
                };
                _csv.AppendRecord(_ctx.StudentsPath, student);
            }

            return new
            {
                userId,
                email = request.Email,
                role = request.Role,
                fullName = request.FullName,
                defaultPassword = DEFAULT_PASSWORD
            };
        }
    }
}
