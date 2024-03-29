import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormTextareaComponent } from '../../../components/forms/inputs/form-textarea/form-textarea.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { TimeControl } from '../../../models/entities/time-control.model';
import { ResultResponse } from '../../../models/result-response.model';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { TimeControlIncidenceCreateRequest } from './time-control-incidence-create-request.model';

@Component({
  selector: 'aw-time-control-incidence-create',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, FormTextareaComponent, BtnLoadingComponent, SpinnerComponent],
  templateUrl: './time-control-incidence-create.component.html'
})
export class TimeControlIncidenceCreateComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly toastrService = inject(ToastrService);

  private readonly bsModalRef = inject(BsModalRef);

  @Input({ required: true }) timeControlId!: string;

  @Output() hasSubmit = new EventEmitter<void>();

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  incidenceDescriptionDisabled = false;
  incidenceMaxCharacters = 256;
  incidenceCharacters = 0;
  timeControl!: TimeControl;
  loadingTimeControl = false;

  ngOnInit(): void {
    this.loadTimeControl();
  }

  handleClose(): void {
    this.bsModalRef.hide();
  }

  handleIncidenceCharacters(): void {
    const incidenceCharacters = this.form.get('incidenceDescription')?.value.length;
    this.incidenceCharacters = incidenceCharacters;

    if (incidenceCharacters === 0 || this.incidenceCharacters === this.incidenceMaxCharacters) {
      return;
    }
  }

  handleSubmit(): void {
    const url = urlReplaceParams(ApiUrls.timeControl.createIncidence, { id: this.timeControlId });
    const timeControlIncidenceCreateRequest = this.form.value as TimeControlIncidenceCreateRequest;
    timeControlIncidenceCreateRequest.timeControlId = this.timeControlId;

    this.timeControlApiService
      .put<TimeControlIncidenceCreateRequest, ResultResponse>(timeControlIncidenceCreateRequest, url)
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Incidencia creada con éxito');
            this.hasSubmit.emit();
            this.bsModalRef.hide();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      incidenceDescription: [
        this.timeControl.incidenceDescription,
        [Validators.required, Validators.maxLength(this.incidenceMaxCharacters)]
      ]
    });
  }

  private loadTimeControl(): void {
    this.loadingTimeControl = true;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlById, { id: this.timeControlId });

    this.timeControlApiService
      .get<TimeControl>(url)
      .pipe(finalize(() => (this.loadingTimeControl = false)))
      .subscribe({
        next: (result: TimeControl) => {
          this.timeControl = result;
          this.incidenceCharacters = result.incidenceDescription?.length ?? 0;
          this.incidenceDescriptionDisabled = this.timeControl.incidence;

          this.buildForm();
        }
      });
  }
}
