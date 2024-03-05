using EmployeeControl.Application.Common.Extensions;
using FluentValidation.Results;

namespace EmployeeControl.Application.Common.Exceptions;

public class CustomValidationException() : Exception("One or more validation failures have occurred.")
{
    public CustomValidationException(IReadOnlyCollection<ValidationFailure> failures)
        : this()
    {
        Errors = failures
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(failureGroup => failureGroup.Key.LowerCaseFirst(), failureGroup => failureGroup.ToArray());
    }

    public IDictionary<string, string[]> Errors { get; } = new Dictionary<string, string[]>();
}
