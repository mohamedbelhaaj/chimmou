import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Student } from '../model/student.model';  // relative path preferred
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsCollection: AngularFirestoreCollection<Student>;

  constructor(private afs: AngularFirestore) {
    this.studentsCollection = afs.collection<Student>('students');
  }

  getStudent() {
    return this.studentsCollection.valueChanges({ idField: 'id' });
  }

  addStudent(student: Student) {
    return this.studentsCollection.add(student);
  }

  updateStudent(id: string, student: Student) {
    return this.studentsCollection.doc(id).update(student);
  }

  deleteStudent(id: string) {
    return this.studentsCollection.doc(id).delete();
  }
}
