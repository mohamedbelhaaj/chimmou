import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
isLargeScreen: BooleanInput;

  constructor() { }

  ngOnInit(): void {
  }

}