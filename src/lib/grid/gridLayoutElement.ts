import { ElementRef, Renderer } from "@angular/core";
import { LayoutService, DeviceSize } from "./../core/index";
import { SizeMapping } from "./sizeMapping";
import { OrderMapping } from "./orderMapping";
import { GridElementClasses } from "./gridElementClasses";
import { ItemsSeparationClasses } from "./constants"

export abstract class GridLayoutElement {

    private _size: string | SizeMapping;
    private currentDomVisibility = true;
    private previousSwitchState: boolean;

    constructor(protected readonly elementRef: ElementRef, protected readonly renderer: Renderer, protected readonly layoutService: LayoutService){
        this.layoutService.onDeviceSizeChanged.subscribe((deviceSize: DeviceSize) => {
            const currentSwitchState = this.checkSwitchSize(deviceSize);
            if(currentSwitchState !== this.previousSwitchState) {
                this.previousSwitchState = currentSwitchState;
                this.switchElement(this.previousSwitchState);
                this.setHorizontalAlignment(this.horizontalAlignment);
                this.setVerticalAlignment(this.verticalAlignment);
            }
            
            this.updateSize();
            this.updateOrder();
        });
    }

    switchSize: string;

    separation: string;

    horizontalAlignment: string;

    verticalAlignment: string;

    order: number | OrderMapping = 0;

    protected get size(): string | SizeMapping {
        return this._size;
    }

    protected set size(value: string | SizeMapping) {
        this._size = value;
        this.updateSize();
    }

    protected get switched(): boolean {
        return this.previousSwitchState;
    }

    protected abstract get elementClasses(): GridElementClasses;

    protected abstract switchElement(switchValid: boolean): void;

    protected abstract changeOrder(newOrderValue: number): void;

    protected abstract changeSize(newSizeValue: string): void;

    protected init(): void {
        this.previousSwitchState = this.checkSwitchSize(this.layoutService.currentDeviceSize);
        this.switchElement(this.previousSwitchState);
        this.setHorizontalAlignment(this.horizontalAlignment);
        this.setVerticalAlignment(this.verticalAlignment);
    }

    protected changeDomVisibility(visible: boolean): void {
        this.currentDomVisibility = visible;
    }

    protected updateOrder(): void {
        let newOrderValue = 0;
        if(typeof this.order === "number"){
            newOrderValue = this.order;
        }else if(this.order){
            newOrderValue = this.getOrderOfSize(this.order, this.layoutService.currentDeviceSize);
        }
        this.changeOrder(newOrderValue);
    }

    protected setHorizontalAlignment(alignment: string){
        this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.left, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.horizontalCenter, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.right, false);
        switch (alignment) {
            case "left":
                 this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.left, true);
                break;
            case "center":
                this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.horizontalCenter, true);
                break;
            case "right":
                this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.right, true);
                break;
        }
    }

    protected setVerticalAlignment(alignment: string){
        this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.top, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.verticalCenter, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.bottom, false);
        switch (alignment) {
            case "top":
                 this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.top, true);
                break;
            case "center":
                this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.verticalCenter, true);
                break;
            case "bottom":
                this.renderer.setElementClass(this.elementRef.nativeElement, this.elementClasses.bottom, true);
                break;
        }
    }

    protected setItemsSepartions(itemsSeparation: string){
        this.renderer.setElementClass(this.elementRef.nativeElement, ItemsSeparationClasses.All, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, ItemsSeparationClasses.Between, false);
        switch (itemsSeparation) {
            case "all":
                 this.renderer.setElementClass(this.elementRef.nativeElement,ItemsSeparationClasses.All, true);
                break;
            case "between":
                this.renderer.setElementClass(this.elementRef.nativeElement, ItemsSeparationClasses.Between, true);
                break;
        }
    }

    private updateSize(): void {
        let newFlexValue = "";
        if(typeof this.size === "string"){
            if(this.size === "none" && this.size === "hidden") {
                newFlexValue = this.size;
            }
            else {
                newFlexValue = `0 0 ${this.size}`; 
            }
        }
        else if(this.size) {
            newFlexValue = this.getFlexOfSize(this.size, this.layoutService.currentDeviceSize);
        }

        if(newFlexValue === "none") {
            this.changeDomVisibility(false);
            newFlexValue = "";
        }
        else if(!this.currentDomVisibility) {
            this.changeDomVisibility(true);
        }
        
        this.changeSize(newFlexValue);
    }

    private checkSwitchSize(deviceSize: DeviceSize): boolean{
        let switchValid = false;
        switch (this.switchSize) {
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

    private getFlexOfSize(sizeMapping: SizeMapping, currentSize: DeviceSize): string{
        let size: string;
        switch (currentSize) {
            case DeviceSize.extraSmall:
                size = sizeMapping.extraSmall;
                break;
            case DeviceSize.small:
                size = sizeMapping.small || sizeMapping.extraSmall;
                break;
            case DeviceSize.medium:
                size = sizeMapping.medium || sizeMapping.small || sizeMapping.extraSmall;
                break;
            case DeviceSize.large:
                size = sizeMapping.large || sizeMapping.medium || sizeMapping.small || sizeMapping.extraSmall;
                break;
        }

        if(size === "none"){
            return size;
        }

        return size ? `0 0 ${size}` : '1 1 auto';
    }

    private getOrderOfSize(orderMapping: OrderMapping, currentSize: DeviceSize): number{
        let order: number;
        switch (currentSize) {
            case DeviceSize.extraSmall:
                order = orderMapping.extraSmall;
                break;
            case DeviceSize.small:
                order = orderMapping.small || orderMapping.extraSmall;
                break;
            case DeviceSize.medium:
                order = orderMapping.medium || orderMapping.small || orderMapping.extraSmall;
                break;
            case DeviceSize.large:
                order = orderMapping.large || orderMapping.medium || orderMapping.small || orderMapping.extraSmall;
                break;
        }

        return order || 0;
    }
}