import { Component, OnInit } from '@angular/core';
import { EnseignantService } from 'src/app/service/enseignants.service';
import { Enseignant} from 'src/app/model/enseignant.model';



@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {
  enseignants: Enseignant[] = [];
  editState = false;
  enseignantToEdit: Enseignant | null = null;

  constructor(private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.loadEnseignants();
  }

  loadEnseignants(): void {
    this.enseignantService.getEnseignants().subscribe({
      next: (data: any) => (this.enseignants = data),
error: (err: any) => console.error(err)
    });
  }

  editEnseignant(enseignant: Enseignant): void {
    this.enseignantToEdit = { ...enseignant };
  }

  deleteEnseignant(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
      this.enseignantService.deleteEnseignant(id).then(() => this.loadEnseignants());
    }
  }

  onFormSubmitted(): void {
    this.enseignantToEdit = null;
    this.loadEnseignants();
  }
}
export class AddEnseignantComponent {  }
