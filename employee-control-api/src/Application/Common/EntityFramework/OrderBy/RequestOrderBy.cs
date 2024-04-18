using System.Text.Json.Serialization;

namespace EmployeeControl.Application.Common.EntityFramework.OrderBy;

public class RequestOrderBy
{
    public string? PropertyName { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderType Order { get; set; }
}
