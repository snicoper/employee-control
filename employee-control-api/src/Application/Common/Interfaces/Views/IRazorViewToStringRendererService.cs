namespace EmployeeControl.Application.Common.Interfaces.Views;

public interface IRazorViewToStringRendererService
{
    Task<string> RenderViewToStringAsync(string viewName, object model, Dictionary<string, object?> viewData);
}
