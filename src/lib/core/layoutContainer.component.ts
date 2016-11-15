import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "layout, [layout]",
    template: "<div class='flex-container' [class.full-viewport]='fullViewport'><ng-content></ng-content></div>",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./ngLayoutStyles.css"]
})
export class LayoutContainerComponent {

    @Input()
    fullViewport: boolean = true;
}