import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  constructor(    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  login(){
    console.log("event");
    console.log('Your order has been submitted', this.loginForm.value);
    this.loginForm.reset();

  }
}
