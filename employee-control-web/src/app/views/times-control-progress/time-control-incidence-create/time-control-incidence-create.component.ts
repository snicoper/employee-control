import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormTextareaComponent } from '../../../components/forms/inputs/form-textarea/form-textarea.component';
import { ApiUrls } from '../../../core/urls/api-urls';
import { urlReplaceParams } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { ResultResponse } from '../../../models/result-response.model';
import { TimeControlApiService } from '../../../services/api/time-control-api.service';
import { TimeControlIncidenceCreateRequest } from './time-control-incidence-create-request.model';

@Component({
  selector: 'aw-time-control-incidence-create',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, FormTextareaComponent, BtnLoadingComponent],
  templateUrl: './time-control-incidence-create.component.html'
})
export class TimeControlIncidenceCreateComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly toastrService = inject(ToastrService);

  readonly bsModalRef = inject(BsModalRef);

  @Input({ required: true }) timeControlId!: string;

  @Output() hasSubmit = new EventEmitter<boolean>();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  incidenceMaxCharacters = 256;
  incidenceCharacters = 0;

  ngOnInit(): void {
    this.buildForm();
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
            this.hasSubmit.emit(true);
            this.bsModalRef.hide();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      incidenceDescription: ['', [Validators.required, Validators.maxLength(this.incidenceMaxCharacters)]]
    });
  }
}
