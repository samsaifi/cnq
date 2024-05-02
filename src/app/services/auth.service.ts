import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private uid?: string;
    constructor(private router: Router) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.uid = user.uid;
                console.log('User logged in as ', user.email);
            } else {
                console.log('User logged out ');
            }
        });
    }

    registerUser(email: string, password: string) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                this.router.navigate(['/']);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert('something went wrong while registering user');
            });
    }
    loginUser(email: any, password: any) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                // this.router.navigate(['/']);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert('something went wrong while registering user');
            });
    }
    logoutUser() {
        const auth = getAuth();
        signOut(auth).catch((error) => {
            // An error happened.
            const errorMessage = error.message;
            console.log(errorMessage);
            alert('something went wrong while registering user');
        });
    }
    isAuthenticated() {
        return this.uid ? true : false;
    }
    getUid() {
        return this.uid;
    }
}
