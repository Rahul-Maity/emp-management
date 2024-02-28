import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayEmployeeComponent } from './components/display-employee/display-employee.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import {  RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: DisplayEmployeeComponent },
  { path: 'add-edit', component: AddEditEmployeeComponent },
  {path:'edit/:id',component:AddEditEmployeeComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    DisplayEmployeeComponent,
    AddEditEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
