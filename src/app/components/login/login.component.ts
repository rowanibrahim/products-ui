import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserAuthPayload } from '../../services/auth/auth.service';

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
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  login(){
    var payload:UserAuthPayload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.authService.login(payload).subscribe((reponse) =>{ 
      localStorage.setItem('user', JSON.stringify({
        'token': reponse.token,
        'userType': reponse.userType
      }));
      this.loginForm.reset();
      this.navigateToDashboard();
    });
  }
}
