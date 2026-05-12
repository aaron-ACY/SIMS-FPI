using Backend.Models.DTOs.Student;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers.Student
{
    [ApiController]
    [Route("api/student/profile")]
    [Authorize(Roles = "Student")]
    public class ProfileController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public ProfileController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: api/student/profile
        [HttpGet]
        public IActionResult GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var profile = _studentService.GetProfile(userId);
            if (profile == null) return NotFound(new { message = "Không tìm thấy thông tin sinh viên." });

            return Ok(new { message = "Lấy thông tin cá nhân thành công.", data = profile });
        }

        // PATCH: api/student/profile
        [HttpPatch]
        public IActionResult UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var updated = _studentService.UpdateProfile(userId, request);
            if (updated == null) return NotFound(new { message = "Không tìm thấy thông tin sinh viên." });

            return Ok(new { message = "Cập nhật thông tin cá nhân thành công.", data = updated });
        }
    }
}
