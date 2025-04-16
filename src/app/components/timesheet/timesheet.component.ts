import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { Employee } from '../../interfaces/employee';
import { FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
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
  deleteEmployee(employee: Employee, index: number): void {
    if (employee.id) {
      this.employeeService.deleteEmployeeHours(employee).subscribe(() => {
        this.zone.run(() => {
          this.employees.splice(index, 1);
        });
      });
    } else {
      this.zone.run(() => {
        this.employees.splice(index, 1);
      });
    }
  }
  submit(): void {
    this.employees.forEach((employee) => {
      if (employee.id) {
        this.employeeService.updateEmployeeHours(employee);
      } else {
        this.employeeService.saveEmployeeHours(employee);
      }
    });

    this.router.navigate(['./departments']);
  }
  ngOnInit(): void {
    this.$departments = this.DepartmentsService.getDepartments();

    this.$departments
      .pipe(
        switchMap((departments) => {
          this.department = departments.find(
            (dept) => dept.id === this.route.snapshot.params['id']
          );
          return this.employeeService.getEmployeeHoursByDepartment(
            this.department.id
          );
        }),
        tap((employees) => {
          this.employees = employees;
        })
      )
      .subscribe();
  }
}
