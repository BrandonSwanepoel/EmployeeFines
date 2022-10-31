import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { employee } from '../models/employee.interface';
import { modal } from '../models/modal.interface';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: 'employee.component.html',
  styleUrls: ['../shared/shared.component.css', 'employee.component.css'],
})
export class EmployeeComponent implements OnChanges {
  @Input() updatedDetails: any;

  @Output() employee = new EventEmitter<employee>();
  @Output() modal = new EventEmitter<modal>();

  public errorMessage!: string;
  public type: string = 'Employees'

  private searchedText!: string;
  private employees!: employee[];

  constructor(
    private readonly homeComponent: HomeComponent,
    private readonly employeeService: EmployeeService
  ) {
    this.getEmployeesFromService();
  }

  ngOnChanges(): void {
    this.getEmployeesFromService();
  }

  get getSearchedText(): string { return this.searchedText; }
  set setSearchedText(searchText: string) { this.searchedText = searchText; }

  get getEmployees(): employee[] { return this.employees; }
  get hasError(): boolean { return this.errorMessage != undefined }

  public setEmployee(employee: employee): void {
    this.employee.emit(employee);
  }

  public addEmployee(): void {
    this.modal.emit({ showModal: true, title: "Add", type: this.type, body: undefined, })
  }

  public editEmployee(employee: employee): void {
    this.modal.emit({ showModal: true, title: "Edit", type: this.type, body: employee })
  }

  public isSelected(employee: employee): boolean {
    return this.homeComponent.employeeValue === employee;
  }

  public getEmployeesFromService(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data as employee[];
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }
}
