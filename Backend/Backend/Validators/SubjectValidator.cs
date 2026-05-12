using FluentValidation;
using Backend.Models.Entities;

namespace Backend.Models.Validators
{
    public class SubjectValidator : AbstractValidator<Subject>
    {
        public SubjectValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Mã môn học không được để trống.")
                .Matches(@"^[1-9][0-9]{3}$").WithMessage("Mã môn học phải gồm 4 số từ 1000 đến 9999.");

            RuleFor(x => x.Name).NotEmpty().WithMessage("Tên môn học không được để trống.");
        }
    }

    public class SubmissionValidator : AbstractValidator<Submission>
    {
        public SubmissionValidator()
        {
            RuleFor(x => x.SubmissionId)
                .NotEmpty().WithMessage("ID nộp bài không được để trống.")
                .Matches(@"^SUB[0-9]{7}$")
                .WithMessage("ID nộp bài phải có định dạng SUBxxxxxxx (ví dụ: SUB1000254).");

            RuleFor(x => x.StudentId).NotEmpty().WithMessage("Mã sinh viên không được để trống.");
            RuleFor(x => x.AssignmentId).NotEmpty().WithMessage("Mã bài tập không được để trống.");
        }
    }
}