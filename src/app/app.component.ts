import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UsersService) {
  }
  title = 'bootcamptallerangular5';
  userId = localStorage.getItem('id');
  public navBar = {
    isNavbarCollapsed: true,
    propietarios: {
      dropdown: true
    },
    vets: {
      dropdown: true
    }
  };
  public logout(){
    this.userService.logOut();
  }
}
