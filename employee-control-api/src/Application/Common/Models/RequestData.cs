namespace EmployeeControl.Application.Common.Models;

public class RequestData
{
    public int TotalItems { get; set; }

    public int PageNumber { get; set; } = 1;

    public int TotalPages { get; set; } = 1;

    public int PageSize { get; set; } = 10;

    public int Ratio { get; set; } = 2;

    public string Orders { get; set; } = string.Empty;

    public string Filters { get; set; } = string.Empty;
}
