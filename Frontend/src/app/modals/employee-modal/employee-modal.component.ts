import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/employee/employee.service';
import { employee } from 'src/app/models/employee.interface';
import { ModalBase } from '../modal/modal-base';

@Component({
  selector: 'app-employee-modal',
  templateUrl: 'employee-modal.component.html',
})
export class EmployeeModalComponent extends ModalBase implements OnChanges {
  @Input() details!: employee;
  @Output() updatedDetails = new EventEmitter<boolean>();

  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    deactivated: new FormControl(false),
  });

  ngOnChanges(): void {
    this.addingItem = this.adding();
    this.firstName = this.details?.firstName;
    this.lastName = this.details?.lastName;
    this.deactivated = this.details?.deactivated;
  }

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  get firstName(): string { return this.employeeForm.controls['firstName'].value; }
  set firstName(value: any) {
    if (value != undefined) {
      this.employeeForm.controls['firstName'].setValue(value)
    }
  }

  get lastName(): string { return this.employeeForm.controls['lastName'].value; }
  set lastName(value: any) {
    if (value != undefined) {
      this.employeeForm.controls['lastName'].setValue(value);
    }
  }

  get deactivated(): boolean { return this.employeeForm.controls['deactivated'].value }
  set deactivated(value: any) {
    if (value != undefined) {
      this.employeeForm.controls['deactivated'].setValue(value);
    }
  }

  public edit(): void {
    this.employeeService.addOrEdit({ id: this.details.id, firstName: this.firstName, lastName: this.lastName, deactivated: this.deactivated }).subscribe(_ => {
      this.clearValues();
      this.updatedDetails.emit(true);
    },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    )
  }

  public add(): void {
    this.employeeService.addOrEdit({ id: -1, firstName: this.firstName, lastName: this.lastName, deactivated: this.deactivated }).subscribe(_ => {
      this.clearValues();
      this.updatedDetails.emit(true);
    },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    )
  }

  protected adding(): boolean {
    return this.details?.firstName == undefined;
  }

  protected clearValues(): void {
    this.firstName = '';
    this.lastName = '';
    this.deactivated = false;
  }
}
