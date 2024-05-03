import { Snippet } from './../../type/snippet';
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-edit-snippet',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './edit-snippet.component.html',
    styleUrl: './edit-snippet.component.css',
})
export class EditSnippetComponent {
    item: any = {};
    title = new FormControl(this.item.title, [Validators.required]);
    snippet = new FormControl(this.item.snippet, [Validators.required]);
    id = new FormControl(this.item.id, [Validators.required]);
    codeBin = new FormGroup({
        title: this.title,
        snippet: this.snippet,
        id: this.id,
    });

    constructor(
        private dbService: DbService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const Id = this.route.snapshot.paramMap.get('id');
        this.dbService.getDocs(Id!).then((docs) => {
            this.item = docs;
            this.codeBin.setValue({
                title: this.item.title,
                id: this.item.id,
                snippet: this.item.snippet,
            });
        });
    }

    async updateCode() {
        const docid = this.route.snapshot.paramMap.get('id');
        await this.dbService.updateData(this.codeBin.value as Snippet, docid);
        console.log('Snippet saved successfully');
        this.router.navigate(['/']);
    }
}
