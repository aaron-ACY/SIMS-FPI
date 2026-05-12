using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class TeacherValidator : AbstractValidator<Teacher>
    {
        public TeacherValidator()
        {
            RuleFor(x => x.TeacherId)
                .NotEmpty().WithMessage("Mã giảng viên không được để trống.")
                .Matches(@"^FPI[0-9]{3}$").WithMessage("Mã giảng viên phải có định dạng FPIxxx (ví dụ: FPI123) với xxx từ 001 đến 999.");

            RuleFor(x => x.DepartmentId)
                .NotEmpty().WithMessage("Mã phòng ban là bắt buộc.");
        }
    }
}