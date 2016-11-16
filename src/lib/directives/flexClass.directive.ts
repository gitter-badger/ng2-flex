import { Directive, Input, Renderer, ElementRef } from "@angular/core";
import { SizeMapping, LayoutService, DeviceSize } from "./../core/index";

@Directive({
    selector: "flexClass"
})
export class FlexClassDirective {

    private oldDeviceSize: DeviceSize;

    constructor(private layoutService: LayoutService, private renderer: Renderer, private elementRef: ElementRef){
        this.updateClass(layoutService.currentDeviceSize);
        this.oldDeviceSize = layoutService.currentDeviceSize;
        layoutService.onDeviceSizeChanged.subscribe((deviceSize: DeviceSize) => {
            this.updateClass(deviceSize);
            this.oldDeviceSize = deviceSize;
        })
    }

    @Input("flexClass")
    mapping : SizeMapping;

    private updateClass(deviceSize: DeviceSize): void{
        if(this.oldDeviceSize) {
            this.renderer.setElementClass(this.elementRef, this.getClassOfSize(this.oldDeviceSize), false);
        }
        this.renderer.setElementClass(this.elementRef, this.getClassOfSize(deviceSize), true);
    }

    private getClassOfSize(deviceSize: DeviceSize): string{
        if(!this.mapping){
            return "";
        }

        switch (deviceSize) {
            case DeviceSize.extraSmall:
                return this.mapping.extraSmall as string;
            case DeviceSize.small:
                return this.mapping.small as string
            case DeviceSize.medium:
                return this.mapping.medium as string
            case DeviceSize.large:
                return this.mapping.large as string
            default:
                return "";
        }
    }
}