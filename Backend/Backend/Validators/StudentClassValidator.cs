using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class StudentClassValidator : AbstractValidator<StudentClass>
    {
        public StudentClassValidator()
        {
            RuleFor(x => x.EnrollmentId)
                .NotEmpty().WithMessage("ID ghi danh không được để trống.")
                .Matches(@"^E[0-9]{5}$")
                .WithMessage("ID ghi danh phải có định dạng Exxxxx (ví dụ: E10025).");
        }
    }
}
