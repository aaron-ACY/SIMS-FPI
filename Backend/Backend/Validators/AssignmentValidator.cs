using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class AssignmentValidator : AbstractValidator<Assignment>
    {
        public AssignmentValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Tiêu đề bài tập không được để trống.")
                .Matches(@"^(SP|FA|SU)\d{2}_[A-Z]{2}\d{5}_\d{4}(_\d+)?$")
                .WithMessage("Định dạng Assignment phải là: Kì(SP/FA/SU)Năm_TênLớp_MãMôn (Ví dụ: SP26_SE08101_7419).");

            RuleFor(x => x.DueDate).NotEmpty().WithMessage("Ngày hạn nộp không được để trống.");
        }
    }
}