using Backend.Models.DTOs.Admin;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/assignments")]
    [Authorize(Roles = "Admin")]
    public class InstructorController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public InstructorController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // ======================== PHÂN CÔNG GIẢNG VIÊN ========================

        // GET: api/admin/assignments/class-subjects
        [HttpGet("class-subjects")]
        public IActionResult GetAllClassSubjects()
        {
            var list = _adminService.GetAllClassSubjectDetails();
            return Ok(new { message = "Lấy danh sách phân công thành công.", data = list });
        }

        // POST: api/admin/assignments/assign-instructor
        [HttpPost("assign-instructor")]
        public IActionResult AssignInstructor([FromBody] AssignInstructorRequest request)
        {
            if (string.IsNullOrEmpty(request.ClassId) || string.IsNullOrEmpty(request.SubjectId) || string.IsNullOrEmpty(request.TeacherId))
                return BadRequest(new { message = "ClassId, SubjectId và TeacherId là bắt buộc." });

            var result = _adminService.AssignInstructor(request);
            return Ok(new { message = "Phân công giảng viên thành công.", data = result });
        }

        // DELETE: api/admin/assignments/class-subjects/{id}
        [HttpDelete("class-subjects/{id}")]
        public IActionResult RemoveAssignment(string id)
        {
            var result = _adminService.RemoveInstructorAssignment(id);
            if (!result) return NotFound(new { message = $"Không tìm thấy phân công với ID: {id}" });
            return Ok(new { message = "Xóa phân công thành công." });
        }

        // ======================== QUẢN LÝ SINH VIÊN TRONG LỚP ========================

        // GET: api/admin/assignments/classes/{classId}/students
        [HttpGet("classes/{classId}/students")]
        public IActionResult GetStudentsInClass(string classId)
        {
            var students = _adminService.GetStudentsInClass(classId);
            return Ok(new { message = "Lấy danh sách sinh viên trong lớp thành công.", data = students });
        }

        // POST: api/admin/assignments/add-student
        [HttpPost("add-student")]
        public IActionResult AddStudentToClass([FromBody] AddStudentToClassRequest request)
        {
            try
            {
                var result = _adminService.AddStudentToClass(request);
                return Ok(new { message = "Thêm sinh viên vào lớp thành công.", data = result });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/admin/assignments/classes/{classId}/students/{studentId}
        [HttpDelete("classes/{classId}/students/{studentId}")]
        public IActionResult RemoveStudentFromClass(string classId, string studentId)
        {
            var result = _adminService.RemoveStudentFromClass(classId, studentId);
            if (!result) return NotFound(new { message = "Sinh viên không thuộc lớp này." });
            return Ok(new { message = "Xóa sinh viên khỏi lớp thành công." });
        }
    }
}
