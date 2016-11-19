import { Directive, Input, ViewContainerRef, TemplateRef } from "@angular/core";
import { ConditionalSizeDirective } from "./conditionalSize.directive";
import { FlexService, DeviceSize } from "./../core/index";

@Directive({
    selector: "[flxMaxSize]"
})
export class FlxMaxSizeDirective extends ConditionalSizeDirective {

    private _maxSize: string;

    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, flexService: FlexService){
        super(viewContainerRef, templateRef, flexService);
    }

    @Input("flxMaxSize")
    set maxSize(value: string){
        this._maxSize = value;
        this.updateVisibility();
    }

    get maxSize(): string {
        return this._maxSize;
    }

    protected isSizeValid(size: DeviceSize): boolean {
        switch (this.maxSize) {
            case "extraSmall":
                return size === DeviceSize.extraSmall;
            case "small":
                return size === DeviceSize.extraSmall || size === DeviceSize.small;
            case "medium":
                return size === DeviceSize.extraSmall || size === DeviceSize.small || size === DeviceSize.medium;
            case "large":
                return true;
            default:
                return true;
        }
    }
}