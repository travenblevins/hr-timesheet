import { Component } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../interfaces/department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  standalone: false,
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  departments: Department[];
  constructor(
    private departmentsService: DepartmentsService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe(departments => {
      this.departments = departments;
  });
  }
  goToDepartment(departmentId: string): void {
    this.router.navigate(['./timesheet', {id: departmentId}]);
}
}
