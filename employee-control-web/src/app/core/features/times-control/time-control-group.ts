import { DateTime } from 'luxon';
import { ProgressStackedCollection } from '../../../components/progress/progress-stacked/progress-stacked-collection';
import { ClosedBy } from '../../../models/entities/types/closed-by.model';
import { calculatePercent } from '../../utils/common-utils';
import { DatetimeUtils } from '../../utils/datetime-utils';
import { ProcessTimeControlGroups } from './process-time-control-groups';
import { TimeControlGroupResponse, TimeResponse } from './times-control-response.model';

export class TimeControlProgressStacked {
  private readonly timeControlGroups: TimeControlGroupResponse[];
  private readonly progressStackedCollections: ProgressStackedCollection[];
  private readonly minutesInDay = 60 * 24;

  constructor(timeControlGroups: TimeControlGroupResponse[], date: Date) {
    const processTimeControlGroups = new ProcessTimeControlGroups(timeControlGroups, date);

    this.timeControlGroups = processTimeControlGroups.process();
    this.progressStackedCollections = [];
  }

  /** Compone una lista de TimeControlGroupResponse[] a ProgressStackedCollection[]. */
  compose(): ProgressStackedCollection[] {
    this.composeTimeControlGroups(this.timeControlGroups).forEach((progressStacked) =>
      this.progressStackedCollections.push(progressStacked)
    );

    return this.progressStackedCollections;
  }

  /**
   * Componer rango de tiempos para su representación
   *
   * @param timeControlGroups Grupo de timeControl.
   * @returns ProgressStackedCollection[].
   */
  private composeTimeControlGroups = (timeControlGroups: TimeControlGroupResponse[]): ProgressStackedCollection[] => {
    const progressStackedCollections: ProgressStackedCollection[] = [];

    timeControlGroups.forEach((timeControlGroup: TimeControlGroupResponse) => {
      // Obtener el siguiente timeControlGroup para insertar tiempos superiores a 23:59:59.
      const progressStackedCollection = this.composeTimeControlGroup(timeControlGroup);

      progressStackedCollections.push(progressStackedCollection);
    });

    return progressStackedCollections;
  };

  /**
   * Componer un grupo (día) de TimeControl[].
   *
   * @param timeControlGroup Un grupo (día) de TimeControl[].
   * @param nextTimeControlGroup Siguiente elemento timeControlGroup.
   * @returns ProgressStackedCollection.
   */
  private composeTimeControlGroup(timeControlGroup: TimeControlGroupResponse): ProgressStackedCollection {
    const progressStacked = new ProgressStackedCollection();
    let totalMinutesInGroup = 0;
    let currentPercent = 0;
    let lastTimeCalculate: DateTime;

    // Obtener el primer tiempo y establecerlo en lastTimeCalculate.
    if (timeControlGroup.times.length) {
      lastTimeCalculate = DateTime.fromJSDate(new Date(timeControlGroup.times[0].start)).startOf('day');
    }

    timeControlGroup.times.forEach((time: TimeResponse) => {
      totalMinutesInGroup += time.minutes;

      // Inicio y final del TimeResponse.
      const dateTimeStart = DateTime.fromJSDate(new Date(time.start));
      const dateTimeEnd = DateTime.fromJSDate(new Date(time.finish));

      // Calcular posición del día.
      const diffDateTime = dateTimeStart.diff(lastTimeCalculate, ['minutes']);
      const diffPercent = calculatePercent(this.minutesInDay, diffDateTime.minutes);

      // Insertar tiempo de inactividad (progressStackedItem).
      progressStacked.addItem(time.id, currentPercent, 0, 100, diffPercent, '', '', 'bg-transparent');
      currentPercent += diffPercent;

      // Insertar tiempo de actividad (progressStackedItem).
      const background = this.getCssClassByTimeState(time);
      const timeDuration = DatetimeUtils.formatMinutesToTime(time.minutes);
      let tooltip = `${dateTimeStart.toLocaleString(DateTime.TIME_SIMPLE)} - `;
      tooltip += `${dateTimeEnd.toLocaleString(DateTime.TIME_SIMPLE)} `;
      tooltip += `(${timeDuration})`;

      // Añadir item al grupo.
      progressStacked.addItem(time.id, currentPercent, 0, 100, time.dayPercent, timeDuration, tooltip, background);
      currentPercent += time.dayPercent;

      lastTimeCalculate = DateTime.fromJSDate(new Date(time.finish));
    });

    // Componer el title del ProgressStackedCollection.
    const totalGroupTime = DatetimeUtils.formatMinutesToTime(totalMinutesInGroup);
    progressStacked.title = DateTime.fromISO(timeControlGroup.dayTitle).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    progressStacked.title += ` - ${totalGroupTime}`;

    return progressStacked;
  }

  /**
   * Obtener el css dependiendo del estado del tiempo.
   * Si tiene incidencia abierta, sobre-escribe el estado.
   *
   * @param time Un TimeResponse.
   * @returns String con la clase css según estado.
   */
  private getCssClassByTimeState(time: TimeResponse): string {
    if (time.incidence) {
      return 'bg-danger';
    }

    switch (time.closedBy) {
      case ClosedBy.unclosed:
        return 'bg-primary';
      case ClosedBy.system:
        return 'bg-danger';
      default:
        return 'bg-success';
    }
  }
}
