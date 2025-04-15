import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Employee } from '../interfaces/employee';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeHoursCollection: AngularFirestoreCollection<Employee>;
  private filteredEmployees: AngularFirestoreCollection<Employee>;
  constructor(private db: AngularFirestore) {
    // Initialize collection reference in the constructor where injection context is available
    this.employeeHoursCollection = this.db.collection('employee-hours');
  }

  saveEmployeeHours(employee: Employee): Promise<any> {
    employee.departmentId = employee.departmentId || '0';
    console.log('Saving employee hours:', employee);
    // Use the pre-initialized collection reference
    return this.employeeHoursCollection.add(employee);
  }
  getEmployeeHoursByDepartment(departmentId: string): Observable<Employee[]> {
    const filteredEmployees = this.db.collection('employee-hours', (ref) =>
      ref.where('departmentId', '==', departmentId)
    );
    return filteredEmployees.snapshotChanges().pipe(
      map((items: DocumentChangeAction<Employee>[]): Employee[] => {
        return items.map((item: DocumentChangeAction<Employee>): Employee => {
          return {
            id: item.payload.doc.id,
            departmentId,
            name: item.payload.doc.data().name,
            payRate: item.payload.doc.data().payRate,
            monday: item.payload.doc.data().monday,
            tuesday: item.payload.doc.data().tuesday,
            wednesday: item.payload.doc.data().wednesday,
            thursday: item.payload.doc.data().thursday,
            friday: item.payload.doc.data().friday,
            saturday: item.payload.doc.data().saturday,
            sunday: item.payload.doc.data().sunday,
          };
        });
      })
    );
  }
}
