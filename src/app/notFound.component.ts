import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'not-found-component',
    template: `<p><strong>404</strong> - Not found</p>`
})
export class NotFoundComponent {
    constructor() { }
}
