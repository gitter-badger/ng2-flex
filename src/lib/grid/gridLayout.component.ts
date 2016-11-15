import { Component, HostBinding, ElementRef, Renderer  } from "@angular/core";

@Component({
    selector: "gridLayout, [gridLayout]",
    template: "<ng-content></ng-content>"
})
export class GridLayoutComponent {

    constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer){
        this.renderer.setElementClass(this.elementRef.nativeElement, "flex-container-child", true);
        this.renderer.setElementClass(this.elementRef.nativeElement, "flex-container", true);
        this.renderer.setElementClass(this.elementRef.nativeElement, "flex-vertical-container", true);
    }
}