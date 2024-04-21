import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormTextareaComponent } from '../../../components/forms/inputs/form-textarea/form-textarea.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { TimeControl } from '../../../models/entities/time-control.model';
import { ResultResponse } from '../../../models/result-response.model';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { TimeControlIncidenceCreateRequest } from './time-control-incidence-create-request.model';

@Component({
  selector: 'aw-time-control-incidence-create',
  templateUrl: './time-control-incidence-create.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormTextareaComponent,
    BtnLoadingComponent,
    NonFieldErrorsComponent
  ]
})
export class TimeControlIncidenceCreateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly dialogData = inject<{ timeControlId: string }>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<TimeControlIncidenceCreateComponent>);

  private readonly timeControlId = this.dialogData.timeControlId;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  incidenceMaxCharacters = 256;
  incidenceLength = 0;
  timeControl!: TimeControl;
  loadingTimeControl = false;
  disabled = false;

  ngOnInit(): void {
    this.loadTimeControl();
  }

  handleIncidenceCharacters(): void {
    const incidenceCharacters = this.form.get('incidenceDescription')?.value.length;
    this.incidenceLength = incidenceCharacters;

    if (incidenceCharacters === 0 || this.incidenceLength === this.incidenceMaxCharacters) {
      return;
    }
  }

  handleSubmit(): void {
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.createIncidence, { id: this.timeControlId });
    const timeControlIncidenceCreateRequest = this.form.value as TimeControlIncidenceCreateRequest;
    timeControlIncidenceCreateRequest.timeControlId = this.timeControlId;

    this.timeControlApiService
      .put<TimeControlIncidenceCreateRequest, ResultResponse>(timeControlIncidenceCreateRequest, url)
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.snackBarService.success('Incidencia creada con éxito');
          }

          this.dialogRef.close();
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      incidenceDescription: {
        value: this.timeControl.incidenceDescription,
        disabled: this.timeControl.incidenceDescription
      },
      validators: [Validators.required, Validators.maxLength(this.incidenceMaxCharacters)]
    });
  }

  private loadTimeControl(): void {
    this.loadingTimeControl = true;
    const url = CommonUtils.urlReplaceParams(ApiUrl.timeControl.getTimeControlById, { id: this.timeControlId });

    this.timeControlApiService
      .get<TimeControl>(url)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: TimeControl) => {
          this.timeControl = result;

          if (!this.timeControl.incidence) {
            this.timeControl.incidenceDescription = '';
          }

          this.disabled = this.timeControl.incidence;
          this.incidenceLength = result.incidenceDescription?.length ?? 0;

          this.buildForm();
        }
      });
  }
}
