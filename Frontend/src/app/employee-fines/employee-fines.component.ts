import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { fine } from '../models/fines.interface';
import { employee } from '../models/employee.interface';
import { EmployeeFinesService } from './employee-fines.service';
import { HttpErrorResponse } from '@angular/common/http';
import { modal } from '../models/modal.interface';

@Component({
  selector: 'app-employee-fines',
  templateUrl: 'employee-fines.component.html',
  styleUrls: ['../shared/shared.component.css'],
})
export class EmployeeFinesComponent implements OnChanges {
  @Input() updatedDetails: any;
  @Input() employee: employee | undefined;

  @Output() modal = new EventEmitter<modal>();

  public type: string = 'Fine';
  public errorMessage!: string;
  private searchedText!: string;
  private fines!: fine[];

  ngOnChanges() {
    this.getEmployeeFines(this.employee?.id);
  }
  constructor(private employeeFinesService: EmployeeFinesService) { }

  get getSearchedText(): string { return this.searchedText; }
  set setSearchedText(searchText: string) { this.searchedText = searchText; }

  get employeeSelected(): boolean { return this.employee?.firstName != undefined }
  get employeeDeactivated(): boolean { return this.employee?.deactivated == true}
  get employeeFines(): fine[] { return this.employeeSelected ? this.fines : []; }
  get hasError(): boolean { return this.errorMessage != undefined; }

  get getTitle(): string {
    if (this.employeeDeactivated) {
      return `${this.employee?.firstName} ${this.employee?.lastName} is deactivated`
    }
    if (this.employeeSelected) {
      return `${this.employee?.firstName} ${this.employee?.lastName}'s fines`
    }

    return 'Select an employee to see their fines';
  }

  public deleteEmployeeFine(id: number): void {
    this.employeeFinesService.delete(id).subscribe(_ => {
      this.getEmployeeFines(this.employee?.id);
    },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }

  public exportToJson(): void {
    if (this.employee?.firstName == undefined) {
      return;
    }
    var anchorElement = document.createElement('a');
    anchorElement.setAttribute(
      'href',
      'data:text/plain;charset=utf-u,' +
      encodeURIComponent(JSON.stringify(this.employeeFines))
    );
    anchorElement.setAttribute(
      'download',
      `${this.employee?.firstName} ${this.employee?.lastName}'s Fines.json`
    );
    anchorElement.click();
    alert('Exported to Json file');
  }

  public addEmployeeFine(): void {
    this.modal.emit({ showModal: true, title: "Add", type: this.type, body: this.employee?.id })
  }

  public editEmployeeFine(fine: fine): void {
    this.modal.emit({ showModal: true, title: "Edit", type: this.type, body: fine })
  }

  private getEmployeeFines(id: number | undefined): void {
    if (id === undefined || this.employeeDeactivated) {
      return;
    }

    this.employeeFinesService.getEmployeeFines(id).subscribe(
      data => {
        this.fines = data as fine[];
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }
}
