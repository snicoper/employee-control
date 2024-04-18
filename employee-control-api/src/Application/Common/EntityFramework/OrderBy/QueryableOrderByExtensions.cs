using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Text.Json;
using EmployeeControl.Application.Common.EntityFramework.OrderBy.Exceptions;
using EmployeeControl.Application.Common.Extensions;
using EmployeeControl.Application.Common.Models;

namespace EmployeeControl.Application.Common.EntityFramework.OrderBy;

public static class QueryableOrderByExtensions
{
    public static IQueryable<TEntity> Ordering<TEntity>(this IQueryable<TEntity> source, RequestData request)
    {
        if (string.IsNullOrEmpty(request.Order))
        {
            // Por defecto si existe, ordena por "Created | Id" - Descending.
            return OrderByDefault(source);
        }

        var options = new JsonSerializerOptions { WriteIndented = true, PropertyNameCaseInsensitive = true };

        var requestItemOrderBy = JsonSerializer
            .Deserialize<RequestOrderBy>(request.Order, options);

        if (requestItemOrderBy is null)
        {
            var result = OrderByDefault(source);

            return result;
        }

        source = HandleOrderByCommand(source, requestItemOrderBy, OrderByCommandType.OrderBy);

        return source;
    }

    public static IOrderedQueryable<TEntity> OrderByCommand<TEntity>(
        this IQueryable<TEntity> source,
        string orderByProperty,
        string command)
    {
        var type = typeof(TEntity);
        var property = type.GetProperty(orderByProperty);

        var prop = orderByProperty.Split('.').Select(name => typeof(TEntity).GetProperty(name)).ToArray();
        if (property is null && prop.Length > 1)
        {
            property = prop.FirstOrDefault();
        }

        if (property is null)
        {
            throw new OrderFieldEntityNotFoundException(type.Name, orderByProperty);
        }

        var parameter = Expression.Parameter(type, "p");
        var propertyAccess = Expression.MakeMemberAccess(parameter, property);
        var orderByExpression = Expression.Lambda(propertyAccess, parameter);

        var resultExpression = Expression.Call(
            typeof(Queryable),
            command,
            new[] { type, property.PropertyType },
            source.Expression,
            Expression.Quote(orderByExpression));

        var result = (IOrderedQueryable<TEntity>)source.Provider.CreateQuery<TEntity>(resultExpression);

        return result;
    }

    private static IQueryable<TEntity> OrderByDefault<TEntity>(IQueryable<TEntity> source)
    {
        var propertyInfo = typeof(TEntity).GetProperty("Created") ?? typeof(TEntity).GetProperty("Id");
        var result = propertyInfo is not null ? source.OrderBy($"{propertyInfo.Name} DESC") : source;

        return result;
    }

    private static IOrderedQueryable<TEntity> HandleOrderByCommand<TEntity>(
        IQueryable<TEntity> source,
        RequestOrderBy field,
        OrderByCommandType orderByCommandType = OrderByCommandType.ThenBy)
    {
        var fieldName = field.PropertyName?.UpperCaseFirst() ?? string.Empty;

        var command = orderByCommandType switch
        {
            OrderByCommandType.OrderBy => field.Order == OrderType.Asc
                ? QueryableOrderByCommandType.OrderByDescending
                : QueryableOrderByCommandType.OrderBy,
            OrderByCommandType.ThenBy => field.Order == OrderType.Desc
                ? QueryableOrderByCommandType.ThenByDescending
                : QueryableOrderByCommandType.ThenBy,
            _ => throw new NotImplementedException()
        };

        source = source.OrderByCommand(fieldName, command);
        var result = (IOrderedQueryable<TEntity>)source;

        return result;
    }
}
