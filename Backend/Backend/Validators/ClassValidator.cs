using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class ClassValidator : AbstractValidator<ClassEntity>
    {
        public ClassValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("ID lớp không được để trống.")
                .Matches(@"^C[0-9]{4}$")
                .WithMessage("ID lớp phải có định dạng Cxxxx (ví dụ: C1024).");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Tên lớp không được để trống.")
                .Matches(@"^[A-Z]{2}[0-9]{5}$")
                .WithMessage("Tên lớp phải có định dạng 2 chữ cái đầu môn + 2 số khoá + 3 số ngẫu nhiên (Ví dụ: SE08101).");

            RuleFor(x => x.Semester)
                .NotEmpty().WithMessage("Kì học không được để trống.")
                .Must(s => s == "Spring" || s == "Fall" || s == "Summer")
                .WithMessage("Kì học phải là Spring, Fall hoặc Summer.");
        }
    }
}
