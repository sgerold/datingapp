import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/user';
import { Router, RouterLink, RouterLinkActive} from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './NavComponent.html',
  styleUrl: './NavComponent.css'
})
export class Nav {
  protected router = inject(Router);
  protected accountService = inject(AccountService);
  protected toastService = inject(ToastService);

  protected loginCreds = {} as LoginCreds


  login() {
    this.accountService.login(this.loginCreds).subscribe({
      next: response => {
        this.router.navigateByUrl("/members");
        console.log(response);
        this.loginCreds = {} as LoginCreds;
        this.toastService.success('Logged in successfully');
      },
      error: error => {
        console.log(error);
        this.toastService.error(error.error);
      }
    });
  }

  logout() {
    this.accountService.logout();
  this.router.navigateByUrl("/");
  }

  
}
