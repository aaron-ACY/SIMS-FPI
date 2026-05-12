using Backend.Models.DTOs.Admin;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/subjects")]
    [Authorize(Roles = "Admin")]
    public class SubjectController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public SubjectController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // GET: api/admin/subjects
        [HttpGet]
        public IActionResult GetAll()
        {
            var subjects = _adminService.GetAllSubjects();
            return Ok(new { message = "Lấy danh sách môn học thành công.", data = subjects });
        }

        // GET: api/admin/subjects/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var subject = _adminService.GetSubjectById(id);
            if (subject == null) return NotFound(new { message = $"Không tìm thấy môn học với ID: {id}" });
            return Ok(new { data = subject });
        }

        // POST: api/admin/subjects
        [HttpPost]
        public IActionResult Create([FromBody] CreateSubjectRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
                return BadRequest(new { message = "Tên môn học không được để trống." });

            var subject = _adminService.CreateSubject(request);
            return CreatedAtAction(nameof(GetById), new { id = subject.Id }, new { message = "Tạo môn học thành công.", data = subject });
        }

        // PUT: api/admin/subjects/{id}
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateSubjectRequest request)
        {
            var updated = _adminService.UpdateSubject(id, request);
            if (updated == null) return NotFound(new { message = $"Không tìm thấy môn học với ID: {id}" });
            return Ok(new { message = "Cập nhật môn học thành công.", data = updated });
        }

        // DELETE: api/admin/subjects/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _adminService.DeleteSubject(id);
            if (!result) return NotFound(new { message = $"Không tìm thấy môn học với ID: {id}" });
            return Ok(new { message = "Xóa môn học thành công." });
        }
    }
}
