import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // ✅ USE /compat
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private db: AngularFirestore) {} // ✅ inject AngularFirestore

  saveEmployeeHours(employee: Employee): Promise<any> {
    return this.db.collection('employee-hours').add(employee);
  }
}



