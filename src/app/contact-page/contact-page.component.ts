import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {EmailService} from '../services/email.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  emailInput = new FormControl('');
  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  signIn(): void {
  this.emailService.sendEmail(this.emailInput.value);
  }
}
