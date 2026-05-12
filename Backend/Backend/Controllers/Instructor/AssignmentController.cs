using Backend.Models.DTOs.Instructor;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Instructor
{
    [ApiController]
    [Route("api/instructor/assignments")]
    [Authorize(Roles = "Instructor")]
    public class InstructorAssignmentController : ControllerBase
    {
        private readonly IInstructorService _instructorService;

        public InstructorAssignmentController(IInstructorService instructorService)
        {
            _instructorService = instructorService;
        }

        // ======================== BÀI TẬP ========================

        // GET: api/instructor/assignments?classSubjectDetailId=xxx
        [HttpGet]
        public IActionResult GetAssignments([FromQuery] string classSubjectDetailId)
        {
            if (string.IsNullOrEmpty(classSubjectDetailId))
                return BadRequest(new { message = "classSubjectDetailId là bắt buộc." });

            var assignments = _instructorService.GetAssignments(classSubjectDetailId);
            return Ok(new { message = "Lấy danh sách bài tập thành công.", data = assignments });
        }

        // GET: api/instructor/assignments/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var assignment = _instructorService.GetAssignmentById(id);
            if (assignment == null) return NotFound(new { message = $"Không tìm thấy bài tập với ID: {id}" });
            return Ok(new { data = assignment });
        }

        // POST: api/instructor/assignments
        [HttpPost]
        public IActionResult Create([FromBody] CreateAssignmentRequest request)
        {
            if (string.IsNullOrEmpty(request.ClassSubjectDetailId) || string.IsNullOrEmpty(request.Title))
                return BadRequest(new { message = "ClassSubjectDetailId và Title là bắt buộc." });

            var assignment = _instructorService.CreateAssignment(request);
            return CreatedAtAction(nameof(GetById), new { id = assignment.Id }, new { message = "Tạo bài tập thành công.", data = assignment });
        }

        // PUT: api/instructor/assignments/{id}
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateAssignmentRequest request)
        {
            var updated = _instructorService.UpdateAssignment(id, request);
            if (updated == null) return NotFound(new { message = $"Không tìm thấy bài tập với ID: {id}" });
            return Ok(new { message = "Cập nhật bài tập thành công.", data = updated });
        }

        // DELETE: api/instructor/assignments/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _instructorService.DeleteAssignment(id);
            if (!result) return NotFound(new { message = $"Không tìm thấy bài tập với ID: {id}" });
            return Ok(new { message = "Xóa bài tập thành công." });
        }

        // ======================== CHẤM ĐIỂM ========================

        // GET: api/instructor/assignments/{assignmentId}/submissions
        [HttpGet("{assignmentId}/submissions")]
        public IActionResult GetSubmissions(string assignmentId)
        {
            var submissions = _instructorService.GetSubmissions(assignmentId);
            return Ok(new { message = "Lấy danh sách bài nộp thành công.", data = submissions });
        }

        // POST: api/instructor/assignments/submissions/{submissionId}/grade
        [HttpPost("submissions/{submissionId}/grade")]
        public IActionResult GradeSubmission(string submissionId, [FromBody] GradeSubmissionRequest request)
        {
            if (string.IsNullOrEmpty(request.Grade))
                return BadRequest(new { message = "Điểm không được để trống." });

            var result = _instructorService.GradeSubmission(submissionId, request);
            if (result == null) return NotFound(new { message = $"Không tìm thấy bài nộp với ID: {submissionId}" });
            return Ok(new { message = "Chấm điểm thành công.", data = result });
        }

        // PUT: api/instructor/assignments/submissions/{submissionId}/grade
        [HttpPut("submissions/{submissionId}/grade")]
        public IActionResult UpdateGrade(string submissionId, [FromBody] GradeSubmissionRequest request)
        {
            var result = _instructorService.GradeSubmission(submissionId, request);
            if (result == null) return NotFound(new { message = $"Không tìm thấy bài nộp với ID: {submissionId}" });
            return Ok(new { message = "Cập nhật điểm thành công.", data = result });
        }
    }
}
