import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { Employee } from '../../interfaces/employee';
import { FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-timesheet',
  standalone: false,
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class TimesheetComponent {
  $departments: Observable<Department[]> | undefined;
  department: Department | undefined;
  employeeNameFC = new FormControl('', this.nameValidator());
  employees: Employee[] = [];
  employeeId = 0;
  weekdays: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  titlecase: string;

  constructor(
    private route: ActivatedRoute,
    private DepartmentsService: DepartmentsService,
    private employeeService: EmployeeService,
    private router: Router,
    private zone: NgZone
  ) {}

  
  addEmployee(): void {
    if (this.employeeNameFC.value) {
      this.employeeId++;

      this.employees.push({
        // id: this.employeeId.toString(),
        departmentId: this.department?.id,
        name: this.employeeNameFC.value,
        payRate: Math.floor(Math.random() * 50) + 50,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      });

      this.employeeNameFC.setValue('');
    }
  }
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.employees && this.employees.length) {
        this.employees.forEach((employee) => {
          if (employee.name.toLowerCase() === control.value.toLowerCase()) {
            error = { duplicate: true };
          }
        });
      }
      return error;
    };
  }
  deleteEmployee(employee: Employee): void {
    this.employees = this.employees.filter((e) => e !== employee);
  }
  submit(): void {
    console.log('Submitting employees:', this.employees);

    this.zone.run(() => {
      const savePromises = this.employees.map((employee) => {
        console.log('Saving employee:', employee);
        return this.employeeService.saveEmployeeHours(employee);
      });

      Promise.all(savePromises)
        .then(() => {
          console.log('All employees saved successfully');
          this.router.navigate(['./departments']);
        })
        .catch((error) => {
          console.error('Error saving employee hours:', error);
        });
    });
  }
}
