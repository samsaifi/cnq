import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-code-bin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './code-bin.component.html',
    styleUrl: './code-bin.component.css',
})
export class CodeBinComponent {
    title = new FormControl('', [Validators.required]);
    snippet = new FormControl('', [Validators.required]);
    codeBin = new FormGroup({
        title: this.title,
        snippet: this.snippet,
    });
    submitCode() {
        console.log(this.codeBin.value);
    }
}
