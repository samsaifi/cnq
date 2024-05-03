import { deleteDoc } from 'firebase/firestore';
import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(private dbService: DbService) {}
    items: { id: string; title: string }[] = [];
    ngOnInit() {
        this.dbService.getAllSnippets().then((data: any) => {
            console.log(data);
            this.items = data;
        });
    }

    deleteDoc(id: string) {
        this.dbService.deleteData(id);
    }
}
