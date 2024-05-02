import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Snippet } from '../type/snippet';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root',
})
export class DbService {
    private db?: any;
    constructor(private authService: AuthService) {
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }
    async createSnippet(snippets: Snippet) {
        try {
            const docRef = await addDoc(collection(this.db, 'snippets'), {
                ...snippets,
                by: this.authService.getUid(),
            });
            console.log('Snippet written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
            alert('something went wrong while Snippet written');
        }
    }
}
