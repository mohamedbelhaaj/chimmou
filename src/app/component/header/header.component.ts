import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // You can add initialization logic here if needed
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
} 