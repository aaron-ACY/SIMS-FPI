using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class StudentValidator : AbstractValidator<Student>
    {
        public StudentValidator()
        {
            RuleFor(x => x.StudentId)
                .NotEmpty().WithMessage("Mã sinh viên không được để trống.")
                .Matches(@"^BD00[0-9]{3}$").WithMessage("Mã sinh viên phải có định dạng BD00xxx (ví dụ: BD00889) với xxx từ 001 đến 999.");

            RuleFor(x => x.Gender)
                .Must(x => x == "Male" || x == "Female" || x == "Other")
                .WithMessage("Giới tính phải là Male, Female hoặc Other.");
        }
    }
}
