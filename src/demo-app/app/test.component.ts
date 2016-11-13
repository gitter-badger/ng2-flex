import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'test',
    templateUrl: './test.component.html',
    host: {
        '[style.width]': "'100%'",
        '[style.margin]': "'10px'"
    }
})
export class TestComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}