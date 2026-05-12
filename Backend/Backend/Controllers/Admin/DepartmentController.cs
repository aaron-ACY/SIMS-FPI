using Backend.Models.DTOs.Admin;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/departments")]
    [Authorize(Roles = "Admin")]
    public class DepartmentController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public DepartmentController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // GET: api/admin/departments
        [HttpGet]
        public IActionResult GetAll()
        {
            var departments = _adminService.GetAllDepartments();
            return Ok(new { message = "Lấy danh sách phòng ban thành công.", data = departments });
        }

        // GET: api/admin/departments/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var dept = _adminService.GetDepartmentById(id);
            if (dept == null) return NotFound(new { message = $"Không tìm thấy phòng ban với ID: {id}" });
            return Ok(new { data = dept });
        }

        // POST: api/admin/departments
        [HttpPost]
        public IActionResult Create([FromBody] CreateDepartmentRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
                return BadRequest(new { message = "Tên phòng ban không được để trống." });

            var dept = _adminService.CreateDepartment(request);
            return CreatedAtAction(nameof(GetById), new { id = dept.Id }, new { message = "Tạo phòng ban thành công.", data = dept });
        }

        // PUT: api/admin/departments/{id}
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateDepartmentRequest request)
        {
            var updated = _adminService.UpdateDepartment(id, request);
            if (updated == null) return NotFound(new { message = $"Không tìm thấy phòng ban với ID: {id}" });
            return Ok(new { message = "Cập nhật phòng ban thành công.", data = updated });
        }

        // DELETE: api/admin/departments/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _adminService.DeleteDepartment(id);
            if (!result) return NotFound(new { message = $"Không tìm thấy phòng ban với ID: {id}" });
            return Ok(new { message = "Xóa phòng ban thành công." });
        }
    }
}
