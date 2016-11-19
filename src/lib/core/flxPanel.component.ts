import { Component, Input, ElementRef, Renderer } from "@angular/core";
import { FlexService, FlexElement, Orientation, VerticalAlignment, HorizontalAlignment, ItemsSeparation, SizeMapping } from "./index";

@Component({
    selector: "flxPanel, [flxPanel]",
    template: "<ng-content></ng-content>"
})
export class FlxPanelComponent extends FlexElement {

    constructor(readonly elementRef: ElementRef, readonly renderer: Renderer, readonly flexService: FlexService){
        super(elementRef, renderer, flexService);
    }

    @Input()
    set orientation(value: Orientation){
        this.setOrientation(value);
    }

    get orientation(): Orientation {
        return this.getOrientation();
    }

    @Input()
    set verticalAlignment(value: VerticalAlignment){
        this.setVerticalAlignment(value);
    }

    get verticalAlignment(): VerticalAlignment {
        return this.getVerticalAlignment();
    }

    @Input()
    set horizontalAlignment(value: HorizontalAlignment){
        this.setHorizontalAlignment(value);
    }

    get horizontalAligment(): HorizontalAlignment {
        return this.getHorizontalAligment();
    }


    @Input()
    set itemsSeparation(value: ItemsSeparation) {
        this.setItemsSeparation(value);
    }

    get itemsSeparation(): ItemsSeparation {
        return this.getItemsSeparation();
    }

    @Input()
    set size(value: string | SizeMapping) {
        this.setSize(value);
    }

    get size(): string | SizeMapping {
        return this.getSize();
    }

    @Input()
    set order(value: number | SizeMapping) {
        this.setOrder(value);
    }

    get order(): number | SizeMapping {
        return this.getOrder();
    }
}