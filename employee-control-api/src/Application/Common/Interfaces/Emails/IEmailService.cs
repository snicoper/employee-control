using System.Net.Mail;

namespace EmployeeControl.Application.Common.Interfaces.Emails;

public interface IEmailService
{
    /// <summary>
    /// Prioridad del Email, por defecto High.
    /// </summary>
    MailPriority MailPriority { get; set; }

    /// <summary>
    /// Quien envía el Email.
    /// </summary>
    string? From { get; set; }

    /// <summary>
    /// Lista de destinatarios.
    /// </summary>
    ICollection<string> To { get; set; }

    /// <summary>
    /// Titulo del Email.
    /// </summary>
    string? Subject { get; set; }

    /// <summary>
    /// Cuerpo del mensaje.
    /// </summary>
    string? Body { get; set; }

    /// <summary>
    /// Enviar el Body como HTML.
    /// </summary>
    bool IsBodyHtml { get; set; }

    /// <summary>
    /// Envía un Email.
    /// </summary>
    void SendMail();

    /// <summary>
    /// Envía un Email utilizando una plantilla y un modelo.
    /// </summary>
    /// <param name="viewName">Nombre de la vista.</param>
    /// <param name="model">Datos para la vista.</param>
    /// <typeparam name="TModel">Clase del Modelo.</typeparam>
    Task SendMailWithViewAsync<TModel>(string viewName, TModel model)
        where TModel : class;
}
