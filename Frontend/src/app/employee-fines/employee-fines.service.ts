import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { fine } from '../models/fines.interface';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFinesService {
  readonly APIUrl: string = GlobalConstants.APIUrl;

  constructor(private httpClient: HttpClient) { }

  getEmployeeFines(id: number) {
    return this.httpClient.get(`${this.APIUrl}/Fines/${id}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.APIUrl}/Fines/${id}`);
  }

  public addOrEdit(fine: fine) {
    return this.httpClient.post<fine>(`${this.APIUrl}/Fines`, fine);
  }
}
