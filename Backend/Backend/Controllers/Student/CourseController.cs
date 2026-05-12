using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers.Student
{
    [ApiController]
    [Route("api/student/courses")]
    [Authorize(Roles = "Student")]
    public class CourseController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public CourseController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: api/student/courses — Lấy danh sách môn học đã đăng ký
        [HttpGet]
        public IActionResult GetMySubjects()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var subjects = _studentService.GetMySubjects(userId);
            return Ok(new { message = "Lấy danh sách môn học thành công.", data = subjects });
        }

        // GET: api/student/courses/{classSubjectDetailId}/materials — Lấy tài liệu môn học
        [HttpGet("{classSubjectDetailId}/materials")]
        public IActionResult GetMaterials(string classSubjectDetailId)
        {
            var materials = _studentService.GetMaterials(classSubjectDetailId);
            return Ok(new { message = "Lấy danh sách tài liệu thành công.", data = materials });
        }
    }
}
