using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers.Instructor
{
    [ApiController]
    [Route("api/instructor/classes")]
    [Authorize(Roles = "Instructor")]
    public class ClassManagementController : ControllerBase
    {
        private readonly IInstructorService _instructorService;

        public ClassManagementController(IInstructorService instructorService)
        {
            _instructorService = instructorService;
        }

        // GET: api/instructor/classes
        // Lấy danh sách lớp của giảng viên đang đăng nhập
        [HttpGet]
        public IActionResult GetMyClasses()
        {
            var teacherId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(teacherId))
                return Unauthorized(new { message = "Không xác định được giảng viên." });

            var classes = _instructorService.GetClassesByTeacher(teacherId);
            return Ok(new { message = "Lấy danh sách lớp thành công.", data = classes });
        }

        // GET: api/instructor/classes/{classSubjectDetailId}/students
        // Lấy danh sách sinh viên trong lớp
        [HttpGet("{classSubjectDetailId}/students")]
        public IActionResult GetStudentsInClass(string classSubjectDetailId)
        {
            var students = _instructorService.GetStudentsInClass(classSubjectDetailId);
            return Ok(new { message = "Lấy danh sách sinh viên thành công.", data = students });
        }
    }
}
