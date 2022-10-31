import { Component, OnChanges } from '@angular/core';
import { employee } from '../models/employee.interface';
import { modal } from '../models/modal.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnChanges {
  public updatedDetails!: any
  public showModal!: boolean;

  private employee: employee | undefined;
  private modal: modal | undefined;

  ngOnChanges(): void {
    this.showModal = this.modal?.showModal == undefined ? false : this.modal?.showModal
  }

  get employeeValue() { return this.employee };
  get modalDetails() { return this.modal }

  public setEmployee(event: any) {
    if (this.employee === event) {
      this.employee = undefined;
      return;
    }
    this.employee = event;
  }

  public setModal(event: any) {
    this.modal = event;
  }

  public setUpdatedDetails(event: any) {
    this.updatedDetails = new String(event);
  }
}
