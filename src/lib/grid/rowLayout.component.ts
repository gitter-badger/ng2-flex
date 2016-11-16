import { Component, Input, HostBinding, SimpleChanges, SimpleChange, ElementRef, Renderer } from "@angular/core";
import { LayoutService, DeviceSize, SizeMapping } from "./../core/index";
import { GridLayoutElement } from "./gridLayoutElement"
import { GridElementClasses } from "./gridElementClasses";
import { rowClasses, columnClasses } from "./constants";

@Component({
    selector: "rowLayout, [rowLayout]",
    template: "<ng-content></ng-content>"
})
export class RowLayoutComponent extends GridLayoutElement {

    private showComponent = true;

    constructor(readonly elementRef: ElementRef, readonly renderer: Renderer, readonly layoutService: LayoutService){
        super(elementRef, renderer, layoutService);
        this.renderer.setElementClass(this.elementRef.nativeElement, "flex-container-child", true);
        this.renderer.setElementClass(this.elementRef.nativeElement, "flex-container", true);
    }

    @HostBinding("class.flex-vertical-container")
    private verticalContainer = false;

    @HostBinding("class.flex-horizontal-container")
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
    order: number | SizeMapping = 0;

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