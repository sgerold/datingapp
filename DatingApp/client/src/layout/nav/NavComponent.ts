import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/_services/AccountService';
import { LoginCreds } from '../../types/user';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './NavComponent.html',
  styleUrl: './NavComponent.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  loggedIn: boolean = false;
  protected loginCreds = {} as LoginCreds


  login() {
    this.accountService.login(this.loginCreds).subscribe({
      next: response => {
        this.loggedIn = true;
        console.log(response);
        this.loginCreds = {} as LoginCreds;
      },
      error: error => console.log(error)
    });
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

  
}
