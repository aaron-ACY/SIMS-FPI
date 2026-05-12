namespace Backend.Data
{
    public class CsvDbContext
    {
        private readonly string _storagePath;

        public CsvDbContext(IConfiguration configuration)
        {
            _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "CSVStorage");

            if (!Directory.Exists(_storagePath))
            {
                Directory.CreateDirectory(_storagePath);
            }
        }

        // Paths to CSV files
        public string UsersPath => Path.Combine(_storagePath, "users.csv");
        public string StudentsPath => Path.Combine(_storagePath, "students.csv");
        public string TeachersPath => Path.Combine(_storagePath, "teachers.csv");
        public string SubjectsPath => Path.Combine(_storagePath, "subjects.csv");
        public string ClassesPath => Path.Combine(_storagePath, "classes.csv");
        public string DepartmentsPath => Path.Combine(_storagePath, "departments.csv");
        public string AssignmentsPath => Path.Combine(_storagePath, "assignments.csv");
        public string SubmissionsPath => Path.Combine(_storagePath, "submissions.csv");
        public string CourseMaterialsPath => Path.Combine(_storagePath, "course_materials.csv");
        public string StudentClassesPath => Path.Combine(_storagePath, "student_classes.csv");
        public string ClassSubjectDetailsPath => Path.Combine(_storagePath, "class_subject_details.csv");
        public string StudentSubjectEnrollmentsPath => Path.Combine(_storagePath, "student_subject_enrollments.csv");
    }
}