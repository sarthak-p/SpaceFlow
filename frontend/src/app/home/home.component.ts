import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  articles: { title: string, author: string, date: string, body: string }[] = [];

  constructor() {
    this.articles = [
      {
        title: 'First Article',
        author: 'John Doe',
        date: '2024-03-25',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        title: 'Second Article',
        author: 'Jane Smith',
        date: '2024-03-26',
        body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ];
  }


}
