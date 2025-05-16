import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Cours } from '../model/cours.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(private firestore: Firestore) {}  

  // 🔹 Récupérer tous les cours
  getCours(): Observable<Cours[]> {
    const coursCollection = collection(this.firestore, 'cours');
return collectionData(coursCollection, { idField: 'id' }) as Observable<Cours[]>;
  }

  // 🔹 Récupérer un cours par ID
  getCoursById(id: string): Observable<Cours> {
    const coursDoc = doc(this.firestore, `cours/${id}`);
    return docData(coursDoc, { idField: 'id' }) as Observable<Cours>;
  }

  // 🔹 Ajouter un cours
  addCours(cours: Cours): Promise<any> {
    const coursCollection = collection(this.firestore, 'cours');
    return addDoc(coursCollection, cours);
  }

  // 🔹 Mettre à jour un cours
  updateCours(id: string, cours: Partial<Cours>): Promise<void> {
    const coursDoc = doc(this.firestore, `cours/${id}`);
    return updateDoc(coursDoc, cours);
  }

  // 🔹 Supprimer un cours
  deleteCours(id: string): Promise<void> {
    const coursDoc = doc(this.firestore, `cours/${id}`);
    return deleteDoc(coursDoc);
  }
}
