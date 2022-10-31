import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeFinesService } from 'src/app/employee-fines/employee-fines.service';
import { fine } from 'src/app/models/fines.interface';
import { ModalBase } from '../modal/modal-base';

@Component({
  selector: 'app-employee-fine-modal',
  templateUrl: 'employee-fine-modal.component.html'
})
export class EmployeeFineModalComponent extends ModalBase implements OnChanges {
  @Input() details!: fine;
  @Input() employeeId!: number
  @Output() updatedDetails = new EventEmitter<boolean>();

  fineForm = new FormGroup({
    value: new FormControl(''),
    date: new FormControl(''),
  });

  private fineId!: number;

  ngOnChanges(): void {
    this.addingItem = this.adding();
    this.fineId = this.details?.id;
    this.fineValue = this.details?.value;
    this.dateOfFine = this.details?.date;
  }

  constructor(private readonly employeeFinesService: EmployeeFinesService) {
    super();
  }

  get fineValue(): string { return this.fineForm.controls['value'].value; }
  set fineValue(value: any) {
    if (value != undefined) {
      this.fineForm.controls['value'].setValue(value);
    }
  }

  get dateOfFine(): string { return this.fineForm.controls['date'].value }
  set dateOfFine(value: any) {
    if (value != undefined) {
      this.fineForm.controls['date'].setValue(value);
    }
  }

  public edit(): void {
    this.employeeFinesService.addOrEdit({ id: this.fineId, employee_id: this.employeeId, value: this.fineValue, date: this.dateOfFine }).subscribe(_ => {
      this.clearValues();
      this.updatedDetails.emit(true);
    },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    )
  }

  public add(): void {
    this.employeeFinesService.addOrEdit({ id: -1, employee_id: this.employeeId, value: this.fineValue, date: this.dateOfFine })
      .subscribe(_ => {
        this.clearValues();
        this.updatedDetails.emit(true);
      },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      )
  }

  protected adding(): boolean {
    return this.details?.value == undefined;
  }

  protected clearValues(): void {
    this.fineValue = '';
    this.dateOfFine = '';
  }
}
