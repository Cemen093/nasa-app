import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  apiKey: string;

  constructor() {
    this.apiKey = localStorage.getItem('apiKey') || '';
  }

  saveApiKey(): void {
    localStorage.setItem('apiKey', this.apiKey);
  }

  clearApiKey(): void {
    localStorage.removeItem('apiKey');
    this.apiKey = '';
  }
}
