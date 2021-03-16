import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {BasketProductDto} from '../models/basketProductDto';
import {FormControl} from '@angular/forms';
import {EmailService} from '../services/email.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {



  emailInput = new FormControl('');
  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.emailService.sendEmail(this.emailInput.value);
  }

}
