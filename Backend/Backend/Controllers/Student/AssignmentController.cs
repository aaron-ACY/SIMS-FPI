using Backend.Models.DTOs.Student;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers.Student
{
    [ApiController]
    [Route("api/student/assignments")]
    [Authorize(Roles = "Student")]
    public class StudentAssignmentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentAssignmentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: api/student/assignments?classSubjectDetailId=xxx — Lấy danh sách bài tập
        [HttpGet]
        public IActionResult GetAssignments([FromQuery] string classSubjectDetailId)
        {
            if (string.IsNullOrEmpty(classSubjectDetailId))
                return BadRequest(new { message = "classSubjectDetailId là bắt buộc." });

            var assignments = _studentService.GetAssignments(classSubjectDetailId);
            return Ok(new { message = "Lấy danh sách bài tập thành công.", data = assignments });
        }

        // POST: api/student/assignments/{assignmentId}/submit — Nộp bài tập
        [HttpPost("{assignmentId}/submit")]
        [Consumes("multipart/form-data")]
        public IActionResult SubmitAssignment(string assignmentId, [FromForm] SubmitAssignmentFormRequest form)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            if (form.File == null || form.File.Length == 0)
                return BadRequest(new { message = "File bài nộp không được để trống." });

            try
            {
                var submission = _studentService.SubmitAssignment(userId, assignmentId, form.File);
                return Ok(new { message = "Nộp bài thành công.", data = submission });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET: api/student/assignments/submissions — Lịch sử nộp bài
        [HttpGet("submissions")]
        public IActionResult GetSubmissionHistory()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var submissions = _studentService.GetSubmissionHistory(userId);
            return Ok(new { message = "Lấy lịch sử nộp bài thành công.", data = submissions });
        }

        // GET: api/student/assignments/grades — Kết quả điểm
        [HttpGet("grades")]
        public IActionResult GetGrades()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Không xác định được người dùng." });

            var grades = _studentService.GetGrades(userId);
            return Ok(new { message = "Lấy kết quả điểm thành công.", data = grades });
        }
    }
}
