import { Injectable } from '@angular/core';
import{TimetableSlot} from '../model/timetable.model'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private firestore: AngularFirestore) {}

  getTimetable(): Observable<TimetableSlot[]> {
    return this.firestore.collection<TimetableSlot>('timetables').valueChanges({ idField: 'id' });
  }

  addSlot(slot: TimetableSlot) {
    return this.firestore.collection('timetables').add(slot);
  }

  deleteSlot(id: string) {
    return this.firestore.collection('timetables').doc(id).delete();
  }

  updateSlot(id: string, data: Partial<TimetableSlot>) {
    return this.firestore.collection('timetables').doc(id).update(data);
  }
}