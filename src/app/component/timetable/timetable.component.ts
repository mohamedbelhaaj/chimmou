import { Component } from '@angular/core';
import { TimetableSlot } from 'src/app/model/timetable.model';
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {
  slots: TimetableSlot[] = [];
  newSlot: TimetableSlot = {
    day: '',
    subject: '',
    startTime: '',
    endTime: '',
    class: '',
    teacher: ''
  };

  constructor(private timetableService: TimetableService) {}

  ngOnInit() {
    this.timetableService.getTimetable().subscribe((slots: TimetableSlot[]) => this.slots = slots);
  }

  addSlot() {
    this.timetableService.addSlot(this.newSlot).then(() => {
      this.newSlot = { day: '', subject: '', startTime: '', endTime: '', class: '', teacher: '' };
    });
  }

  deleteSlot(id: string) {
    this.timetableService.deleteSlot(id);
  }
}
