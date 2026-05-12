using Backend.Models.DTOs.Instructor;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Instructor
{
    [ApiController]
    [Route("api/instructor/materials")]
    [Authorize(Roles = "Instructor")]
    public class CourseMaterialController : ControllerBase
    {
        private readonly IInstructorService _instructorService;

        public CourseMaterialController(IInstructorService instructorService)
        {
            _instructorService = instructorService;
        }

        // GET: api/instructor/materials?classSubjectDetailId=xxx
        [HttpGet]
        public IActionResult GetMaterials([FromQuery] string classSubjectDetailId)
        {
            if (string.IsNullOrEmpty(classSubjectDetailId))
                return BadRequest(new { message = "classSubjectDetailId là bắt buộc." });

            var materials = _instructorService.GetMaterials(classSubjectDetailId);
            return Ok(new { message = "Lấy danh sách tài liệu thành công.", data = materials });
        }

        // GET: api/instructor/materials/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var material = _instructorService.GetMaterialById(id);
            if (material == null) return NotFound(new { message = $"Không tìm thấy tài liệu với ID: {id}" });
            return Ok(new { data = material });
        }

        // POST: api/instructor/materials
        [HttpPost]
        public IActionResult Create([FromBody] CreateCourseMaterialRequest request)
        {
            if (string.IsNullOrEmpty(request.ClassSubjectDetailId) || string.IsNullOrEmpty(request.Title))
                return BadRequest(new { message = "ClassSubjectDetailId và Title là bắt buộc." });

            var material = _instructorService.CreateMaterial(request);
            return CreatedAtAction(nameof(GetById), new { id = material.Id }, new { message = "Tạo tài liệu thành công.", data = material });
        }

        // PUT: api/instructor/materials/{id}
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateCourseMaterialRequest request)
        {
            var updated = _instructorService.UpdateMaterial(id, request);
            if (updated == null) return NotFound(new { message = $"Không tìm thấy tài liệu với ID: {id}" });
            return Ok(new { message = "Cập nhật tài liệu thành công.", data = updated });
        }

        // DELETE: api/instructor/materials/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var result = _instructorService.DeleteMaterial(id);
            if (!result) return NotFound(new { message = $"Không tìm thấy tài liệu với ID: {id}" });
            return Ok(new { message = "Xóa tài liệu thành công." });
        }
    }
}
