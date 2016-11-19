import { Directive, Input, Renderer, ElementRef } from "@angular/core";
import { SizeMapping, FlexService, DeviceSize } from "./../core/index";

@Directive({
    selector: "[flxClass]"
})
export class FlxClassDirective {

    private oldDeviceSize: DeviceSize;

    constructor(private flexService: FlexService, private renderer: Renderer, private elementRef: ElementRef) {
        this.updateClass(flexService.currentDeviceSize);
        flexService.onDeviceSizeChanged.subscribe((deviceSize: DeviceSize) => {
            this.updateClass(deviceSize);
        });
    }

    @Input("flxClass")
    mapping: SizeMapping;

    private updateClass(deviceSize: DeviceSize): void {
        if(this.oldDeviceSize) {
            const classOfSize = this.getClassOfSize(this.oldDeviceSize);
            if(classOfSize && typeof(classOfSize) === "string"){
                this.renderer.setElementClass(this.elementRef.nativeElement, classOfSize, false);
            }
        }
        const classOfSize = this.getClassOfSize(deviceSize);
        if(classOfSize && typeof(classOfSize) === "string"){
            this.renderer.setElementClass(this.elementRef.nativeElement, classOfSize, true);
            this.oldDeviceSize = deviceSize;
        }
    }

    private getClassOfSize(deviceSize: DeviceSize): string {
        if(!this.mapping){
            return "";
        }

        switch (deviceSize) {
            case DeviceSize.extraSmall:
                return this.mapping.extraSmall as string;
            case DeviceSize.small:
                return this.mapping.small as string;
            case DeviceSize.medium:
                return this.mapping.medium as string;
            case DeviceSize.large:
                return this.mapping.large as string;
            default:
                return "";
        }
    }
}