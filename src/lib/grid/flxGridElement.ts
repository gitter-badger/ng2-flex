import { ElementRef, Renderer } from "@angular/core";
import { FlexElement, FlexService, HorizontalAlignment, VerticalAlignment, ItemsSeparation, DeviceSize, SizeMapping, Orientation } from "./../core/index";

export abstract class FlxGridElement {

    protected readonly flexElement: FlexElement;
    private _switchSize: string;

    constructor(protected readonly elementRef: ElementRef, protected readonly renderer: Renderer, protected readonly flexService: FlexService, private originalOrientation: Orientation){
        this.flexElement = new FlexElement(elementRef, renderer, flexService);
        this.flexElement.setOrientation(originalOrientation);
        this.flexService.onDeviceSizeChanged.subscribe((deviceSize: DeviceSize) => {
            this.updateOrientation();
        });
    }

    protected setSwitchSize(value: string) {
        this._switchSize = value;
        this.updateOrientation();
    }

    protected setHorizontalAlignment(value: string) {
        switch (value.toUpperCase()) {
            case "LEFT":
                this.flexElement.setHorizontalAlignment(HorizontalAlignment.left);
                break;
            case "CENTER":
                this.flexElement.setHorizontalAlignment(HorizontalAlignment.center);
                break;
            case "RIGHT":
                this.flexElement.setHorizontalAlignment(HorizontalAlignment.right);
                break;
        }
    }

    protected setVerticalAlignment(value: string) {
        switch (value.toUpperCase()) {
            case "TOP":
                this.flexElement.setVerticalAlignment(VerticalAlignment.top);
                break;
            case "CENTER":
                this.flexElement.setVerticalAlignment(VerticalAlignment.center);
                break;
            case "BOTTOM":
                this.flexElement.setVerticalAlignment(VerticalAlignment.bottom);
                break;
        }
    }

    protected setItemsSeparation(value: string) {
        switch (value.toUpperCase()) {
            case "ALL":
                this.flexElement.setItemsSeparation(ItemsSeparation.all);
                break;
            case "BETWEEN":
                this.flexElement.setItemsSeparation(ItemsSeparation.between);
                break;
        }
    }

    private updateOrientation(){
        const switchElement = this.checkSwitchSize(this._switchSize, this.flexService.currentDeviceSize);
        if(switchElement){
            if(this.originalOrientation === Orientation.horizontal){
                this.flexElement.setOrientation(Orientation.vertical);
            }
            else {
                this.flexElement.setOrientation(Orientation.horizontal);
            }
        }
        else {
            this.flexElement.setOrientation(this.originalOrientation);
        }
    }

    private checkSwitchSize(switchSize: string, deviceSize: DeviceSize): boolean {
        let switchValid = false;
        switch (switchSize) {
            case "extraSmall":
                switchValid = deviceSize === DeviceSize.extraSmall;
                break;
            case "small":
                switchValid = deviceSize === DeviceSize.extraSmall || deviceSize === DeviceSize.small;
                break;
            case "medium":
                switchValid = deviceSize === DeviceSize.extraSmall || deviceSize === DeviceSize.small || deviceSize === DeviceSize.medium;
                break;
            case "large":
                switchValid = deviceSize === DeviceSize.extraSmall || deviceSize === DeviceSize.small || deviceSize === DeviceSize.medium || deviceSize === DeviceSize.large;
                break;
        }

        return switchValid;
    }
}