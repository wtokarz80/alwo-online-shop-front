import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
  }
}
