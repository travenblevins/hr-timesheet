import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-timesheet',
  standalone: false,
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css'
})
export class TimesheetComponent {
  departments: Department[];
  department: Department;
  constructor(
    private route: ActivatedRoute,
    private DepartmentsService: DepartmentsService
  ) { }

  ngOnInit(): void {
    this.departments = this.DepartmentsService.departments;
    this.department = this.departments.find(department => department.id === this.route.snapshot.params['id']);
  }
}
