import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/NavComponent";
import { AccountService } from '../core/_services/AccountService';
import { lastValueFrom } from 'rxjs';
import { User } from '../types/user';
import { Home } from "./features/home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  http = inject(HttpClient);
  protected title = 'DatingApp';
  protected users = signal<User[]>([]);
 

  async ngOnInit() {
    this.users.set(await this.getMembers());
    this.setCurrentUser();
  }
 
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString)
      return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/users'));
    } catch(error) {
      console.log(error);
      throw(error);
    }
  }

}
