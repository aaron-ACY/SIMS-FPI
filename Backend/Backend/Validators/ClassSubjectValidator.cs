using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class ClassSubjectValidator : AbstractValidator<ClassSubject>
    {
        public ClassSubjectValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID chi tiết môn học không được để trống.")
                .Matches(@"^CSD[0-9]{5}$")
                .WithMessage("ID chi tiết môn học phải có định dạng CSDxxxxx (ví dụ: CSD10501).");

            RuleFor(x => x.Status)
                .NotEmpty().WithMessage("Trạng thái không được để trống.")
                .Must(s => s == "open" || s == "closed")
                .WithMessage("Trạng thái phải là 'open' hoặc 'closed'.");
        }
    }
}
