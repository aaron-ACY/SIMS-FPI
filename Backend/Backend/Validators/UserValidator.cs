using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID người dùng không được để trống.");

            // Validation based on Role
            When(x => x.Role == "Admin", () => {
                RuleFor(x => x.Id)
                    .Matches(@"^AD[0-9]{3}$")
                    .WithMessage("Mã số Admin phải có định dạng ADxxx (ví dụ: AD165) với xxx từ 001 đến 999.");
            });

            When(x => x.Role == "Student", () => {
                RuleFor(x => x.Id)
                    .Matches(@"^BD00[0-9]{3}$")
                    .WithMessage("Mã số Sinh viên trong bảng User phải có định dạng BD00xxx.");
            });

            When(x => x.Role == "Instructor", () => {
                RuleFor(x => x.Id)
                    .Matches(@"^FPI[0-9]{3}$")
                    .WithMessage("Mã số Giảng viên trong bảng User phải có định dạng FPIxxx.");
            });

            RuleFor(x => x.Email)
                .NotEmpty().EmailAddress().WithMessage("Email không hợp lệ.");

            RuleFor(x => x.Password)
                .NotEmpty().MinimumLength(6).WithMessage("Mật khẩu phải có ít nhất 6 ký tự.");
        }
    }
}
