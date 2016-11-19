import { Injectable, EventEmitter } from "@angular/core";

import { DeviceSize } from "./deviceSize";

@Injectable()
export class FlexService{

    private _currentDeviceSize: DeviceSize;
    private currentMin = 0;
    private currentMax = 0;

    constructor(){
        this.setDeviceSize();
        window.addEventListener("resize", e => {
            this.setDeviceSize();
        });
    }

    get currentDeviceSize() : DeviceSize {
        return this._currentDeviceSize;
    }

    onDeviceSizeChanged = new EventEmitter<DeviceSize>();

    private setDeviceSize(): void {
        if(window.innerWidth < this.currentMin || window.innerWidth > this.currentMax){
            const currentWidth = window.innerWidth;
            const oldDeviceSize = this.currentDeviceSize;

            if(currentWidth < 768){
                this._currentDeviceSize = DeviceSize.extraSmall;
                this.currentMin = 0;
                this.currentMax = 767;
            }
            else if(currentWidth >= 768 && currentWidth < 992){
                this._currentDeviceSize = DeviceSize.small;
                this.currentMin = 768;
                this.currentMax = 991;
            }
            else if(currentWidth >= 992 && currentWidth < 1200){
                this._currentDeviceSize = DeviceSize.medium;
                this.currentMin = 992;
                this.currentMax = 1199;
            }
            else {
                this._currentDeviceSize = DeviceSize.large;
                this.currentMin = 1200;
                this.currentMax = 999999999;
            }

            if(oldDeviceSize !== this.currentDeviceSize){
                this.onDeviceSizeChanged.emit(this.currentDeviceSize);
            }
        }
    }
}