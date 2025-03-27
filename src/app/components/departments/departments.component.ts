import { Component } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../interfaces/department';

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
  ) { }
  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
  }
}
