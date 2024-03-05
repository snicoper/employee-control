using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using FluentValidation.Results;

namespace EmployeeControl.Infrastructure.Services.Common;

public class ValidationFailureService : IValidationFailureService
{
    private List<ValidationFailure> Errors { get; } = new();

    public bool HasErrors()
    {
        return Errors.Count != 0;
    }

    public int ErrorsCount()
    {
        return Errors.Count;
    }

    public void Add(string property, string error)
    {
        Errors.Add(new ValidationFailure(property, error));
    }

    public void Add(Dictionary<string, string> errors)
    {
        foreach (var (key, value) in errors)
        {
            Add(key, value);
        }
    }

    public void AddAndRaiseException(string key, string value)
    {
        Add(key, value);
        RaiseException();
    }

    public void AddAndRaiseException(Dictionary<string, string> errors)
    {
        foreach (var (key, value) in errors)
        {
            Add(key, value);
        }

        RaiseException();
    }

    public void RaiseException()
    {
        throw new CustomValidationException(Errors);
    }

    public void RaiseExceptionIfExistsErrors()
    {
        if (HasErrors())
        {
            throw new CustomValidationException(Errors);
        }
    }
}
