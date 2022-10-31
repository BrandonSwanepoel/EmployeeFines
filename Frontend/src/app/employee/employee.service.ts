import { Injectable } from '@angular/core';
import { employee } from '../models/employee.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly APIUrl: string = GlobalConstants.APIUrl;
  public errorMessage!: string;
  constructor(private httpClient: HttpClient) { }

  public getEmployees() {
    return this.httpClient.get(`${this.APIUrl}/Employees`);
  }

  public addOrEdit(employee: employee) {
    return this.httpClient.post<employee>(`${this.APIUrl}/Employees`, employee);
  }
}
