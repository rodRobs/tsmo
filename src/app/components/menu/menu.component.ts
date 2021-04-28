import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
