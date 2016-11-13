import { Component, Input, HostBinding, SimpleChanges, SimpleChange, ElementRef, Renderer } from "@angular/core";
import { LayoutService, DeviceSize } from "./../core/index";
import { SizeMapping } from "./sizeMapping";
import { OrderMapping } from "./orderMapping";
import { GridLayoutElement } from "./gridLayoutElement"
import { GridElementClasses } from "./gridElementClasses";
import { rowClasses, columnClasses } from "./constants";

@Component({
    selector: "row-layout, [row-layout]",
    template: "<ng-content></ng-content>"
})
export class RowLayoutComponent extends GridLayoutElement {

    private showComponent = true;

    constructor(readonly elementRef: ElementRef, readonly renderer: Renderer, readonly layoutService: LayoutService){
        super(elementRef, renderer, layoutService);
        this.renderer.setElementClass(this.elementRef.nativeElement, "container-child", true);
        this.renderer.setElementClass(this.elementRef.nativeElement, "container", true);
    }

    @HostBinding("class.vertical-container")
    private verticalContainer = false;

    @HostBinding("class.horizontal-container")
    private horizontalContainer = true;

    @HostBinding("class.hidden")
    private hidden = false;

    @HostBinding("style.flex")
    private flex: string;

    @HostBinding("style.order")
    private flexOrder: number;

    @Input()
    set height(value: string | SizeMapping){
        this.size = value;
    }

    get height() : string | SizeMapping{
        return this.size;
    }

    @Input()
    switchSize: string;

    @Input()
    separation: string;

    @Input()
    horizontalAlignment: string;

    @Input()
    verticalAlignment: string;

    @Input()
    order: number | OrderMapping = 0;

    ngOnInit() {
        this.init();
    }

    ngOnChanges(changes : SimpleChanges){
        if(changes["horizontalAlignment"] instanceof SimpleChange){
            this.setHorizontalAlignment(changes["horizontalAlignment"].currentValue);
        }

        if(changes["verticalAlignment"] instanceof SimpleChange){
            this.setVerticalAlignment(changes["verticalAlignment"].currentValue);
        }

        if(changes["separation"] instanceof SimpleChange){
            this.setItemsSepartions(changes["separation"].currentValue);
        }

        if(changes["order"] instanceof SimpleChange) {
            this.updateOrder();
        }
    }

    protected switchElement(switchValid: boolean): void{
        this.horizontalContainer = !switchValid;
        this.verticalContainer = switchValid;
    }

    protected get elementClasses(): GridElementClasses {
        if(this.switched) {
            return columnClasses
        }
        else {
            return rowClasses;
        }
    }

    protected changeOrder(newOrderValue: number): void{
        this.flexOrder = newOrderValue;
    }

    protected changeSize(newSizeValue: string): void {
        this.flex = newSizeValue;
    }

    protected changeDomVisibility(visible: boolean): void {
        super.changeDomVisibility(visible);
        this.hidden = !visible;
    }
}