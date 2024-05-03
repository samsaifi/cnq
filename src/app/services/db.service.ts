import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
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

    async getAllSnippets() {
        let result: any = [];
        const querySnapshot = await getDocs(collection(this.db, 'snippets'));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            result.push({ id: doc.id, ...doc.data() });
        });
        return result;
    }

    async getDocs(docId: string) {
        const docRef = doc(this.db, 'snippets', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            return { ...docSnap.data(), id: docId };
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
            return {
                id: docId,
                title: 'null',
                snippet: 'null',
            };
        }
    }
    async deleteData(docId: string) {
        await deleteDoc(doc(this.db, 'snippets', docId));
        console.log('Data Successfully deleted');
    }
    async updateData(snippets: Snippet, docid: any) {
        console.log('update doc', snippets);
        let { title, snippet } = snippets;

        const docRef = doc(this.db, 'snippets', docid);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            title,
            snippet,
            by: this.authService.getUid(),
        });
        console.log('Data Successfully Updated');
    }
}
