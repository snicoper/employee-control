using EmployeeControl.Application.Common.Interfaces.BackgroundJobs;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Infrastructure.Services.BackgroundJobs;

public class CloseTimeControlJob(ITimesControlService timesControlService, ILogger<CloseTimeControlJob> logger)
    : ICloseTimeControlJob
{
    public async Task Process()
    {
        logger.LogInformation($"Procesando ${nameof(CloseTimeControlJob)}.");
        await timesControlService.CloseTimeControlJobAsync();
        logger.LogInformation($"Procesado ${nameof(CloseTimeControlJob)} con éxito.");
    }
}
