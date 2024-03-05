using System.ComponentModel.DataAnnotations.Schema;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Common;

public abstract class BaseEntity : IEntityDomainEvent
{
    private readonly List<BaseEvent> domainEvents;

    protected BaseEntity()
    {
        domainEvents = new List<BaseEvent>();
    }

    public string Id { get; private set; } = Guid.NewGuid().ToString();

    [NotMapped]
    public IReadOnlyCollection<BaseEvent> DomainEvents => domainEvents.AsReadOnly();

    public void AddDomainEvent(BaseEvent domainEvent)
    {
        domainEvents.Add(domainEvent);
    }

    public void RemoveDomainEvent(BaseEvent domainEvent)
    {
        domainEvents.Remove(domainEvent);
    }

    public void ClearDomainEvents()
    {
        domainEvents.Clear();
    }
}
