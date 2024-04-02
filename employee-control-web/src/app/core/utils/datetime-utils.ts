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
   * Obtener en minutos la diferencia entre dos DateTime.
   *
   * @param start DateTime de inicio.
   * @param end DateTime final.
   * @returns Diferencia en minutos de las fechas pasadas.
   */
  static duration(start: DateTime, end: DateTime): number {
    const result = end.diff(start, ['minutes']).minutes;

    return Math.abs(Math.round(result));
  }

  /**
   * Obtener un DateTime como string UTC.
   *
   * @param dateTime DateTime a obtener como UTC.
   * @returns Un string con la hora pasada en UTC.
   */
  static toISOString(dateTime: DateTime): string {
    return dateTime.toUTC().toString();
  }
}
