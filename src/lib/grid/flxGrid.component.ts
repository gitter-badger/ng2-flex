import { Component, HostBinding, ElementRef, Renderer  } from "@angular/core";
import { FlexElement, FlexService, Orientation } from "./../core/index";

@Component({
    selector: "flxGrid, [flxGrid]",
    template: "<ng-content></ng-content>",
})
export class FlxGridComponent {

    private flexElement: FlexElement;
    
    constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer, private readonly flexService: FlexService){
        this.flexElement = new FlexElement(elementRef, renderer, flexService);
        this.flexElement.setOrientation(Orientation.vertical);
    }
}