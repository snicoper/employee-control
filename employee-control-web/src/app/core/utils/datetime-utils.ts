import { DateTime, Interval } from 'luxon';

export abstract class DatetimeUtils {
  /**
   * Obtener un array con un intervalo de días desde start a end con DateTime.
   *
   * @param start Fecha de inicio.
   * @param end Fecha final.
   * @returns Un array de DateTime con el intervalo de días.
   */
  static dayDateTimeInterval(start: DateTime, end: DateTime): (DateTime | null)[] {
    return Interval.fromDateTimes(start.startOf('day'), end.endOf('day'))
      .splitBy({ day: 1 })
      .map((date: Interval) => date.start);
  }

  /**
   * Obtener un array con un intervalo de días desde start a end con Date.
   *
   * @param start Fecha de inicio.
   * @param end Fecha final.
   * @returns Un array de Date con el intervalo de días.
   */
  static dayDateInterval(start: Date, end: Date): Date[] {
    const daysInterval = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      daysInterval.push(new Date(d));
    }

    return daysInterval;
  }

  /**
   * Formatear minutos a un string H:M.
   *
   * @param minutes Minutos totales a formatear.
   * @returns Tiempo H:M
   */
  static formatMinutesToTime(minutes: number): string {
    if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      const rest = Math.floor(minutes % 60);

      return `${hours}h ${rest}m`;
    }

    return `${minutes}m`;
  }
}