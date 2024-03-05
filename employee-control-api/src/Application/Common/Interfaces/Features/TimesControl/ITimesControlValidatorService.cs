using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.TimesControl;

public interface ITimesControlValidatorService
{
    /// <summary>
    /// Reglas de validación de un <see cref="TimeControl" /> en la creación.
    /// <para>Un tiempo creado no deberá estar en algún rango de tiempo ya creado.</para>
    /// <para>Un tiempo creado no deberá estar en algún rango de tiempo que actualmente este abierto.</para>
    /// <para>En caso de no éxito, genera errores en <see cref="IValidationFailureService" />.</para>
    /// </summary>
    /// <param name="timeControl"><see cref="TimeControl" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateCreateAsync(TimeControl timeControl, CancellationToken cancellationToken);

    /// <summary>
    /// Reglas de validación de un <see cref="TimeControl" /> en la actualización.
    /// <para>Un tiempo actualizado no deberá estar en algún rango de tiempo ya creado.</para>
    /// <para>Un tiempo actualizado no deberá estar en algún rango de tiempo que actualmente este abierto.</para>
    /// <para>Las reglas excluyen al tiempo actual.</para>
    /// <para>En caso de no éxito, genera errores en <see cref="IValidationFailureService" />.</para>
    /// </summary>
    /// <param name="timeControl"><see cref="TimeControl" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateUpdateAsync(TimeControl timeControl, CancellationToken cancellationToken);
}
