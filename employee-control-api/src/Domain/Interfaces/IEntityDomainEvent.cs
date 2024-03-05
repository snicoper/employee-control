using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Interfaces;

public interface IEntityDomainEvent
{
    IReadOnlyCollection<BaseEvent> DomainEvents { get; }

    void AddDomainEvent(BaseEvent domainEvent);

    void RemoveDomainEvent(BaseEvent domainEvent);

    void ClearDomainEvents();
}
