import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFinesComponent } from './employee-fines/employee-fines.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './utility/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFineModalComponent } from './modals/employee-fine-modal/employee-fine-modal.component';
import { EmployeeModalComponent } from './modals/employee-modal/employee-modal.component';
import { ModalComponent } from './modals/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFinesComponent,
    EmployeeComponent,
    SearchFilterPipe,
    HomeComponent,
    EmployeeModalComponent,
    EmployeeFineModalComponent,
    ModalComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
