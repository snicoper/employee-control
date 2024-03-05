namespace EmployeeControl.Infrastructure.Exceptions;

public class EmailServiceException(string message) : Exception(message);
