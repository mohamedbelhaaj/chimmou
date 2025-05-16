import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/model/cours.model';
import { Observable } from 'rxjs';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
getPdfUrl(pdfPath: string|File) {
  // Implement based on how your app stores PDFs
  // If it's a URL, return it directly
  return pdfPath.toString();
}
supprimerCours(id: string) {
  this.deleteCours(id);
}
ajouterCours() {
  this.addCours();
}
private generateId(): string {
  return 'cours-' + Date.now();
}
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    // Here you would normally upload the file to storage
    // For now, we'll just store the file name
    this.newCours.pdf = file.name;
  }
}

  coursList$: Observable<Cours[]> | undefined;
  selectedCours: Cours | null = null;
  successMessage: string = '';

  // Exemple de nouveau cours pour ajout
  newCours: Cours = {
    id: this.generateId(),
    nom: '',
    classe: '',
    pdf: '',
  };

  constructor(private coursService: CoursService) {}

  ngOnInit(): void {
    this.loadCours();
  }

  loadCours() {
    this.coursList$ = this.coursService.getCours();
  }

  selectCours(id: string) {
    this.coursService.getCoursById(id).subscribe(cours => {
      this.selectedCours = cours;
    });
  }


  addCours() {
    console.log(this.newCours);
    this.successMessage = '';
    this.coursService.addCours(this.newCours).then(() => {
      // Reset form with a new ID
      this.newCours = { 
        id: this.generateId(), 
        nom: '', 
        classe: '', 
        pdf: '' 
      };
      // Show success message
      this.successMessage = 'Cours ajouté avec succès!';
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }).catch(error => {
      console.error('Erreur lors de l\'ajout du cours:', error);
    });
  }

  updateCours() {
    if (this.selectedCours && this.selectedCours.id) {
      const { id, ...data } = this.selectedCours;
      this.coursService.updateCours(id, data).then(() => {
        this.selectedCours = null;
      });
    }
  }

  deleteCours(id: string) {
    this.coursService.deleteCours(id).then(() => {
      if (this.selectedCours?.id === id) {
        this.selectedCours = null;
      }
    });
  }
}
