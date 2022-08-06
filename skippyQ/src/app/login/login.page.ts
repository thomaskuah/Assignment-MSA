import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private router: Router, private authService: AuthService) {
    

  }

  login() {
    // TODO: Based on user role go to different page
    this.router.navigate(['/tabs/new-loan']);
  }
}
