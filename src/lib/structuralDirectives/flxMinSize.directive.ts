import { Directive, Input, ViewContainerRef, TemplateRef } from "@angular/core";
import { ConditionalSizeDirective } from "./conditionalSize.directive";
import { FlexService, DeviceSize } from "./../core/index";

@Directive({
    selector: "[flxMinSize]"
})
export class FlxMinSizeDirective extends ConditionalSizeDirective {

    private _minSize: string;

    constructor(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<any>, flexService: FlexService){
        super(viewContainerRef, templateRef, flexService);
    }

    @Input("flxMinSize")
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