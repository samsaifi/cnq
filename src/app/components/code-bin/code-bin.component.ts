import { DbService } from './../../services/db.service';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Snippet } from '../../type/snippet';
import { Router } from '@angular/router';

@Component({
    selector: 'app-code-bin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './code-bin.component.html',
    styleUrl: './code-bin.component.css',
})
export class CodeBinComponent {
    constructor(private dbService: DbService, private router: Router) {}
    title = new FormControl('', [Validators.required]);
    snippet = new FormControl('', [Validators.required]);
    codeBin = new FormGroup({
        title: this.title,
        snippet: this.snippet,
    });
    async submitCode() {
        await this.dbService.createSnippet(this.codeBin.value as Snippet);
        console.log('Snippet saved successfully');
        this.router.navigate(['/']);
    }
}
