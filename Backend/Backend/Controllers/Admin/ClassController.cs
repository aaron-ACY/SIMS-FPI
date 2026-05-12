using Backend.Models.DTOs.Admin;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/classes")]
    [Authorize(Roles = "Admin")]
    public class ClassController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public ClassController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // GET: api/admin/classes
        [HttpGet]
        public IActionResult GetAll()
        {
            var classes = _adminService.GetAllClasses();
            return Ok(new { message = "Lấy danh sách lớp thành công.", data = classes });
        }

        // GET: api/admin/classes/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var cls = _adminService.GetClassById(id);
            if (cls == null) return NotFound(new { message = $"Không tìm thấy lớp với ID: {id}" });
            return Ok(new { data = cls });
        }

        // POST: api/admin/classes
        [HttpPost]
        public IActionResult Create([FromBody] CreateClassRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
                return BadRequest(new { message = "Tên lớp không được để trống." });

            var cls = _adminService.CreateClass(request);
            return CreatedAtAction(nameof(GetById), new { id = cls.Id }, new { message = "Tạo lớp thành công.", data = cls });
        }

        // PUT: api/admin/classes/{id}
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateClassRequest request)
        {
            var updated = _adminService.UpdateClass(id, request);
            if (updated == null) return NotFound(new { message = $"Không tìm thấy lớp với ID: {id}" });
            return Ok(new { message = "Cập nhật lớp thành công.", data = updated });
        }

        // DELETE: api/admin/classes/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _adminService.DeleteClass(id);
            if (!result) return NotFound(new { message = $"Không tìm thấy lớp với ID: {id}" });
            return Ok(new { message = "Xóa lớp thành công." });
        }
    }
}
