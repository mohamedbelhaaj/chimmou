import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import{ Student } from 'src/app/model/student.model'
import { FormGroup } from '@angular/forms';

@Component({

  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  


})
export class StudentsComponent implements OnInit{
  

  students: Student[] = [];
  editState = false;
  studentToEdit: Student | null = null;
  router: any;
successMessage: any;
errorMessage: any;
isEditMode: any;
previewUrl: any;
studentForm !: FormGroup;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents() {
    throw new Error('Method not implemented.');
  }

  loadStudent(): void {
    this.studentService.getStudent().subscribe({
      next: (data: any) => (this.students = data),
error: (err: any) => console.error(err)
    });
  }

  editStudent(student: Student): void {
    this.studentToEdit = { ...  student};
  }

  deleteStudent(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet student ?')) {
      this.studentService.deleteStudent(id).then(() => this.loadStudents());
    }
  }

  onFormSubmitted(): void {
    this.studentToEdit = null;
    this.loadStudents();
    this.router.navigate(['/studnets']);



  }

}
export class AddStudentComponent {  }



