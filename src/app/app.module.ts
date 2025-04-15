import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TimesheetComponent } from './components/timesheet/timesheet.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { AnalyticsTableComponent } from './components/analytics-table/analytics-table.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat'; // Use /compat
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore'; // Use /compat
import { environment } from './environment'; // ✅ FIXED
import { EmployeeService } from './services/employee.service';

console.log('Firebase initialized:', environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    TimesheetComponent,
    AnalyticsComponent,
    TopNavbarComponent,
    AnalyticsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // ✅ Initialize Firebase
    AngularFirestoreModule, // ✅ Enable Firestore
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: EmployeeService,
      useFactory: (afs: AngularFirestore) => new EmployeeService(afs),
      deps: [AngularFirestore],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
