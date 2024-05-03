import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NavbarComponent, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router) {}
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [
        Validators.required,
        Validators.minLength(6),
    ]);
    loginForm = new FormGroup({
        email: this.email,
        password: this.password,
    });
    login() {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        console.log(email, password);

        this.authService.loginUser(email, password);
        this.router.navigate(['/']);
    }
    reset() {
        this.loginForm.reset();
    }
}
