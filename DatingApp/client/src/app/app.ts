import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  http = inject(HttpClient)
  protected title = 'DatingApp';
  users: any;

  ngOnInit(): void {
     this.http.get('https://localhost:5001/api/users').subscribe({
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log('Request has completed')
        
     })
  }

}
