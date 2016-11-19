import { Directive, Input, ViewContainerRef, TemplateRef } from "@angular/core";
import { ConditionalSizeDirective } from "./conditionalSize.directive";
import { FlexService, DeviceSize } from "./../core/index";

@Directive({
    selector: "[flxSize]"
})
export class FlxSizeDirective extends ConditionalSizeDirective {

    private _size: string;

    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, flexService: FlexService){
        super(viewContainerRef, templateRef, flexService);
    }

    @Input("flxSize")
    set size(value: string){
        this._size = value;
        this.updateVisibility();
    }

    get size(): string {
        return this._size;
    }

    protected isSizeValid(size: DeviceSize): boolean {
        switch (this.size) {
            case "extraSmall":
                return size === DeviceSize.extraSmall;
            case "small":
                return size === DeviceSize.small;
            case "medium":
                return size === DeviceSize.medium;
            case "large":
                return size === DeviceSize.large;
            default:
                return true;
        }
    }
}