import { Component, OnInit } from '@angular/core';
import { Enseignant } from 'src/app/model/enseignant.model';
import { EnseignantService } from 'src/app/service/enseignants.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-enseignant',
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.css']
})
export class AddEnseignantComponent implements OnInit {
  enseignantForm!: FormGroup;
  isEditMode = false;
  successMessage = '';
  errorMessage = '';
  previewUrl: string | null = null;  // Ajout de la propriété pour l'URL de prévisualisation

  constructor(private fb: FormBuilder, private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.enseignantForm = this.fb.group({
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
        this.previewUrl = reader.result as string;  // Assignation de l'URL de prévisualisation
      };
      reader.readAsDataURL(file);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.enseignantForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.enseignantForm.valid) {
      const enseignantData: Enseignant = this.enseignantForm.value;

      this.enseignantService.addEnseignant(enseignantData).then(
        response => {
          this.successMessage = 'Enseignant ajouté avec succès !';
          this.errorMessage = '';
          this.resetForm();
        },
        error => {
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout de l\'enseignant.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      this.successMessage = '';
    }
  }

  resetForm(): void {
    this.enseignantForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.previewUrl = null;  // Réinitialiser l'URL de prévisualisation
  }
}
