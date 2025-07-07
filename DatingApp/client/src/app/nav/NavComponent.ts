import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/AccountService';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './NavComponent.html',
  styleUrl: './NavComponent.css'
})
export class Nav {
  private accountService = inject(AccountService);
  loggedIn = false;
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => console.log(error)
    });
  }

  logout() {
    this.loggedIn = false;
  }

  
}
