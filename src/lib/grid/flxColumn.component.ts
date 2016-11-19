import { Component, Input, ElementRef, Renderer } from "@angular/core";
import { FlexElement, FlexService, Orientation, SizeMapping } from "./../core/index";
import { FlxGridElement } from "./flxGridElement";

@Component({
    selector: "flxColumn, [flxColumn]",
    template: "<ng-content></ng-content>"
})
export class FlxColumnComponent extends FlxGridElement {

    constructor(readonly elementRef: ElementRef, readonly renderer: Renderer, readonly flexService: FlexService){
        super(elementRef, renderer, flexService, Orientation.vertical);
    }

    @Input()
    set width(value: string | SizeMapping){
        this.flexElement.setSize(value);
    }

    get width() : string | SizeMapping{
        return this.flexElement.getSize();
    }

    @Input()
    set switchSize(value: string){
        this.setSwitchSize(value);
    }

    @Input()
    set separation(value: string){
        this.setItemsSeparation(value);
    }

    @Input()
    set horizontalAlignment(value: string){
        this.setHorizontalAlignment(value);
    }

    @Input()
    set verticalAlignment(value: string){
        this.setVerticalAlignment(value);
    }

    @Input()
    set order(value: number | SizeMapping){
        this.flexElement.setOrder(value);
    }
}