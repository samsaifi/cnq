import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
    const atuh = inject(AuthService);
    const router = inject(Router);
    if (!atuh.isAuthenticated()) {
        console.log('redirected to home');
        router.navigate(['/']);
    }
    return true;
};
