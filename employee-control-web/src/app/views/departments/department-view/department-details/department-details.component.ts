import { Component, computed, inject, Input, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../../components/badges/badge/badge.component';
import { BtnBackComponent } from '../../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../../components/buttons/btn-loading/btn-loading.component';
import { CardComponent } from '../../../../components/cards/card/card.component';
import { TableLoadingComponent } from '../../../../components/tables/table-loading/table-loading.component';
import { ApiUrls, SiteUrls } from '../../../../core/urls/_index';
import { urlReplaceParams } from '../../../../core/utils/_index';
import { ResultResponse } from '../../../../models/_index';
import { BoolToIconPipe } from '../../../../pipes/bool-to-icon.pipe';
import { DepartmentApiService } from '../../../../services/api/_index';
import { DepartmentSelectedService } from '../department-selected.service';

@Component({
  selector: 'aw-department-details',
  templateUrl: './department-details.component.html',
  standalone: true,
  imports: [
    CardComponent,
    BadgeComponent,
    BtnLoadingComponent,
    TableLoadingComponent,
    BtnBackComponent,
    RouterLink,
    BoolToIconPipe
  ]
})
export class DepartmentDetailsComponent implements OnDestroy {
  @Input({ required: true }) departmentId = '';

  private readonly toastrService = inject(ToastrService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly departmentApiService = inject(DepartmentApiService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());
  readonly loadingDepartmentSelected = computed(() => this.departmentSelectedService.loadingDepartmentSelected());

  loadingDepartmentState = false;
  siteUrls = SiteUrls;

  get urlToEdit(): string {
    return urlReplaceParams(SiteUrls.departments.update, { id: this.departmentId });
  }

  ngOnDestroy(): void {
    this.departmentSelectedService.clean();
  }

  handleActivateDepartment(): void {
    this.loadingDepartmentState = true;
    const data = { departmentId: this.departmentId };

    this.departmentApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.departments.activateDepartment)
      .pipe(finalize(() => (this.loadingDepartmentState = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.toastrService.success('Departamento desactivado con éxito');
            this.departmentSelectedService.loadDepartmentById(this.departmentId);
          }
        }
      });
  }

  handleDeactivateDepartment(): void {
    this.loadingDepartmentState = true;
    const data = { departmentId: this.departmentId };

    this.departmentApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.departments.deactivateDepartment)
      .pipe(finalize(() => (this.loadingDepartmentState = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.toastrService.success('Departamento activado con éxito');
            this.departmentSelectedService.loadDepartmentById(this.departmentId);
          }
        }
      });
  }
}
