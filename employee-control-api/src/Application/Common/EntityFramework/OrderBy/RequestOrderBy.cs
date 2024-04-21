namespace EmployeeControl.Application.Common.EntityFramework.OrderBy;

public class RequestOrderBy
{
    public string? PropertyName { get; set; }

    public OrderType OrderType { get; set; }
}
