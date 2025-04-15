import { Component, Input, OnInit } from '@angular/core'; // Import OnInit
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-analytics-table',
  standalone: false,
  templateUrl: './analytics-table.component.html',
  styleUrl: './analytics-table.component.css',
})
export class AnalyticsTableComponent implements OnInit {
  // Implement OnInit
  @Input()
  departmentId: string | undefined;

  weekdays: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService
      .getEmployeeHoursByDepartment(this.departmentId)
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });
  }
  getTotalHours(employee: Employee): number {
    return (
      employee.monday +
      employee.tuesday +
      employee.wednesday +
      employee.thursday +
      employee.friday +
      employee.saturday +
      employee.sunday
    );
  }
}
