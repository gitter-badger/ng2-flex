import { Component, Input, ElementRef, Renderer } from "@angular/core";
import { FlexService, FlexElement, Orientation, VerticalAlignment, HorizontalAlignment, ItemsSeparation, SizeMapping } from "./index";

@Component({
    selector: "flxPanel, [flxPanel]",
    template: "<ng-content></ng-content>"
})
/*export*/ class FlxPanelComponent {

    private flexElement: FlexElement

    /*constructor(readonly elementRef: ElementRef, readonly renderer: Renderer, readonly flexService: FlexService){
        this.flexElement = new FlexElement(elementRef, renderer, flexService);
    }*/

    @Input()
    set orientation(value: Orientation){
        this.flexElement.setOrientation(value);
    }

    get orientation(): Orientation {
        return this.flexElement.getOrientation();
    }

    @Input()
    set verticalAlignment(value: VerticalAlignment){
        this.flexElement.setVerticalAlignment(value);
    }

    get verticalAlignment(): VerticalAlignment {
        return this.flexElement.getVerticalAlignment();
    }

    @Input()
    set horizontalAlignment(value: HorizontalAlignment){
        this.flexElement.setHorizontalAlignment(value);
    }

    get horizontalAligment(): HorizontalAlignment {
        return this.flexElement.getHorizontalAligment();
    }


    @Input()
    set itemsSeparation(value: ItemsSeparation) {
        this.flexElement.setItemsSeparation(value);
    }

    get itemsSeparation(): ItemsSeparation {
        return this.flexElement.getItemsSeparation();
    }

    @Input()
    set size(value: string | SizeMapping) {
        this.flexElement.setSize(value);
    }

    get size(): string | SizeMapping {
        return this.flexElement.getSize();
    }

    @Input()
    set order(value: number | SizeMapping) {
        this.flexElement.setOrder(value);
    }

    get order(): number | SizeMapping {
        return this.flexElement.getOrder();
    }
}