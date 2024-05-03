import { Component, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-snippet',
    standalone: true,
    imports: [],
    templateUrl: './view-snippet.component.html',
    styleUrl: './view-snippet.component.css',
})
export class ViewSnippetComponent {
    constructor(private dbService: DbService, private route: ActivatedRoute) {}
    item: any = {};

    ngOnInit() {
        const DocId = this.route.snapshot.paramMap.get('id');

        this.dbService.getDocs(DocId!).then((docs) => {
            console.log(docs);
            this.item = docs;
        });
    }
}
