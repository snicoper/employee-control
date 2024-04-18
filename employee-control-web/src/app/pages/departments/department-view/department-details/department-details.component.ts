import { Component, OnInit, computed, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badge/badge.component';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { ApiUrl } from '../../../../core/urls/api-urls';
import { SiteUrl } from '../../../../core/urls/site-urls';
import { CommonUtils } from '../../../../core/utils/common-utils';
import { ResultResponse } from '../../../../models/result-response.model';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DepartmentApiService } from '../../../../services/api/department-api.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { DepartmentSelectedService } from '../department-selected.service';

@Component({
  selector: 'aw-department-details',
  templateUrl: './department-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButton,
    MatIcon,
    MatDivider,
    MatProgressSpinner,
    BadgeComponent,
    BtnLoadingComponent,
    BtnBackComponent,
    BoolToIconPipe
  ]
})
export class DepartmentDetailsComponent implements OnInit {
  private readonly snackBarService = inject(SnackBarService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly departmentApiService = inject(DepartmentApiService);

  departmentId = input.required<string>();

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());
  readonly departmentSelectedLoading = computed(() => this.departmentSelectedService.departmentSelectedLoading());

  urlToEdit!: string;
  loadingDepartmentState = false;
  siteUrl = SiteUrl;

  ngOnInit(): void {
    this.urlToEdit = CommonUtils.urlReplaceParams(SiteUrl.departments.update, { id: this.departmentId() });
  }

  handleActivateDepartment(): void {
    this.loadingDepartmentState = true;
    const data = { departmentId: this.departmentId() };

    this.departmentApiService
      .put<typeof data, ResultResponse>(data, ApiUrl.departments.activateDepartment)
      .pipe(finalize(() => (this.loadingDepartmentState = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.snackBarService.success('Departamento desactivado con éxito');
            this.departmentSelectedService.loadDepartmentById(this.departmentId());
          }
        }
      });
  }

  handleDeactivateDepartment(): void {
    this.loadingDepartmentState = true;
    const data = { departmentId: this.departmentId() };

    this.departmentApiService
      .put<typeof data, ResultResponse>(data, ApiUrl.departments.deactivateDepartment)
      .pipe(finalize(() => (this.loadingDepartmentState = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.snackBarService.success('Departamento activado con éxito');
            this.departmentSelectedService.loadDepartmentById(this.departmentId());
          }
        }
      });
  }
}
