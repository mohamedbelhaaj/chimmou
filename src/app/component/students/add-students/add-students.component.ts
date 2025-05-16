import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // utile pour *ngIf, etc.

import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student.model';

@Component({  // <<<<< ICI il manquait le '@'
  standalone: true,
  selector: 'app-add-students',

  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'],

  imports: [CommonModule, ReactiveFormsModule]  // ✅ Ajout ici

})
export class AddStudentComponent implements OnInit {
students: any;
deleteStudent(arg0: any) {
throw new Error('Method not implemented.');
}
editStudent(_t14: any) {
throw new Error('Method not implemented.');
}

  studentForm!: FormGroup;
  isEditMode = false;
  successMessage = '';
  errorMessage = '';
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.studentForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData: Student = this.studentForm.value;

      this.studentService.addStudent(studentData).then(
        response => {
          this.successMessage = 'Étudiant ajouté avec succès !';
          this.errorMessage = '';
          this.resetForm();
        },
        error => {
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout de l\'étudiant.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      this.successMessage = '';
    }
  }

  resetForm(): void {
    this.studentForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.previewUrl = null;
  }
}
