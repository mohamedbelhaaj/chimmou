import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Enseignant } from '../model/enseignant.model';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private enseignantsCollection: AngularFirestoreCollection<Enseignant>;

  constructor(private afs: AngularFirestore) {
    this.enseignantsCollection = afs.collection<Enseignant>('enseignants');
  }

  getEnseignants() {
    return this.enseignantsCollection.valueChanges({ idField: 'id' });
  }

  addEnseignant(enseignant: Enseignant) {
    return this.enseignantsCollection.add(enseignant);
  }

  updateEnseignant(id: string, enseignant: Enseignant) {
    return this.enseignantsCollection.doc(id).update(enseignant);
  }

  deleteEnseignant(id: string) {
    return this.enseignantsCollection.doc(id).delete();
  }
}
