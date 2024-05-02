import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const atuh = inject(AuthService);
    const router = inject(Router);
    if (atuh.isAuthenticated()) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
};
