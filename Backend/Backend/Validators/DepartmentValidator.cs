using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class DepartmentValidator : AbstractValidator<Department>
    {
        public DepartmentValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Mã phòng ban không được để trống.")
                .Matches(@"^DEP[0-9]{3}$").WithMessage("Mã phòng ban phải có định dạng DEPxxx (ví dụ: DEP001).");

            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên phòng ban không được để trống.");
        }
    }
}
