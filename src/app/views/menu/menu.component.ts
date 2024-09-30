import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isHidden = false;
  username = 'Angélica'; 

  toggleSidebar() {
    this.isHidden = !this.isHidden;
  }
}
