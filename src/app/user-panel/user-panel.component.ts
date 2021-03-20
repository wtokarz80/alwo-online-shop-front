import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
  }

}
