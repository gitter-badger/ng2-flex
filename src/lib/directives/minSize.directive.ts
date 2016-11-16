import { Directive, Input, ViewContainerRef, TemplateRef } from "@angular/core";
import { ConditionalSizeDirective } from "./conditionalSize.directive";
import { LayoutService, DeviceSize } from "./../core/index";

@Directive({
    selector: "[minSize]"
})
export class MinSizeDirective extends ConditionalSizeDirective {

    private _minSize: string;

    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, layoutService: LayoutService){
        super(viewContainerRef, templateRef, layoutService);
    }

    @Input("minSize")
    set minSize(value: string){
        this._minSize = value;
        this.updateVisibility();
    }

    get minSize(): string {
        return this._minSize;
    }

    protected isSizeValid(size: DeviceSize): boolean {
        switch (this.minSize) {
            case "extraSmall":
                return true;
            case "small":
                return size === DeviceSize.small || size === DeviceSize.medium || size === DeviceSize.large;
            case "medium":
                return size === DeviceSize.medium || size === DeviceSize.large;
            case "large":
                return size === DeviceSize.large;
            default:
                return true;
        }
    }
}