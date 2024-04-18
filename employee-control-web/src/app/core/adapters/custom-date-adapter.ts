import { LuxonDateAdapter } from '@angular/material-luxon-adapter';

export class CustomDateAdapter extends LuxonDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
}
