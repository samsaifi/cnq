import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent {
    constructor(private router: Router, private authService: AuthService) {}
    register(regFrom: NgForm) {
        console.log(regFrom.value);
        let { email, password } = regFrom.value;
        this.authService.registerUser(email, password);
        // this.router.navigate(['/login']);
    }
    reset(regFrom: NgForm) {
        regFrom.reset();
    }
}
