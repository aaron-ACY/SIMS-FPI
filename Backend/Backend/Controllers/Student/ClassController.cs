using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers.Student
{
    [ApiController]
    [Route("api/student/classes")]
    [Authorize(Roles = "Student")]
    public class StudentClassController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentClassController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: api/student/classes — Lấy danh sách lớp của sinh viên
        [HttpGet]
        public IActionResult GetMyClasses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var classes = _studentService.GetMyClasses(userId);
            return Ok(new { message = "Lấy danh sách lớp thành công.", data = classes });
        }
    }
}
