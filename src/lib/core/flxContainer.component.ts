import { Component, Input, ViewEncapsulation } from "@angular/core";
import { FLEX_CSS_CLASSES } from "./index";

@Component({
    selector: "flxContainer, [flxContainer]",
    template: "<ng-content></ng-content>",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./ng2FlexStyles.css"],
    host: {
        "[class]": "containerClasses",
        "[class.ng2flex-full-viewport]": "fullViewport"
    }
})
export class FlxContainerComponent {

    private containerClasses = FLEX_CSS_CLASSES.containerClass;

    @Input()
    fullViewport: boolean = true;
}