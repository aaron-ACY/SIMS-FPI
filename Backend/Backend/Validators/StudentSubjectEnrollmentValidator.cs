using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class StudentSubjectEnrollmentValidator : AbstractValidator<StudentSubjectEnrollment>
    {
        public StudentSubjectEnrollmentValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID đăng ký môn học không được để trống.")
                .Matches(@"^SSE[0-9]{6}$")
                .WithMessage("ID đăng ký môn học phải có định dạng SSExxxxxx (ví dụ: SSE123456).");

            RuleFor(x => x.Status)
                .NotEmpty().WithMessage("Trạng thái không được để trống.")
                .Must(s => s == "active" || s == "dropped")
                .WithMessage("Trạng thái phải là 'active' hoặc 'dropped'.");
        }
    }
}
