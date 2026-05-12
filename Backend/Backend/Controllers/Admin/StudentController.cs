using Backend.Models.DTOs.Admin;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/accounts")]
    [Authorize(Roles = "Admin")]
    public class AccountController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AccountController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // POST: api/admin/accounts
        [HttpPost]
        public IActionResult CreateAccount([FromBody] CreateAccountRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.FullName) || string.IsNullOrEmpty(request.Role))
                return BadRequest(new { message = "Email, FullName và Role là bắt buộc." });

            if (request.Role != "Instructor" && request.Role != "Student")
                return BadRequest(new { message = "Role phải là 'Instructor' hoặc 'Student'." });

            try
            {
                var result = _adminService.CreateAccount(request);
                return Ok(new { message = "Tạo tài khoản thành công.", data = result });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
