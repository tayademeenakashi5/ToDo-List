import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('drawer') drawer: MatSidenav | undefined;
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    
  }
  //searchText: string = '';
  
  //search(): void {
    // Implement your search logic here
   // console.log('Searching...');
  //}
  toggleSidenav(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
   
  


}

}

