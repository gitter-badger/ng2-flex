import { ElementRef, Renderer } from "@angular/core";
import { FLEX_CSS_CLASSES, FlexService, Orientation, VerticalAlignment, HorizontalAlignment, ItemsSeparation, SizeMapping, DeviceSize } from "./index";

export class FlexElement {

    private _orientation = Orientation.horizontal;
    private _verticalAlignment : VerticalAlignment = undefined;
    private _horizontalAlignment : HorizontalAlignment = undefined;
    private _itemsSeparation: ItemsSeparation = undefined;
    private _size: string | SizeMapping = "auto";
    private _order: number | SizeMapping = 0;

    constructor(protected readonly elementRef: ElementRef, protected readonly renderer: Renderer, protected readonly flexService: FlexService){
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.containerClass, true);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.childClass, true);
    }

    setOrientation(value: Orientation){
        this._orientation = value;
        this.updateOrientation(value);
        this.updateHorizontalAligment(this._horizontalAlignment);
        this.updateVerticalAlignment(this._verticalAlignment);
        this.updateItemsSeparation(this._itemsSeparation);
    }

    getOrientation(): Orientation {
        return this._orientation;
    }

    setVerticalAlignment(value: VerticalAlignment){
        this._verticalAlignment = value;
        this.updateVerticalAlignment(value);
    }

    getVerticalAlignment(): VerticalAlignment {
        return this._verticalAlignment;
    }

    setHorizontalAlignment(value: HorizontalAlignment){
        this._horizontalAlignment = value;
        this.updateHorizontalAligment(value);
    }

    getHorizontalAligment(): HorizontalAlignment {
        return this._horizontalAlignment
    }

    setItemsSeparation(value: ItemsSeparation) {
        this._itemsSeparation = value;
        this.updateItemsSeparation(value);
    }

    getItemsSeparation(): ItemsSeparation {
        return this._itemsSeparation;
    }

    setSize(value: string | SizeMapping) {
        this._size = value;
        this.updateSize(value);
    }

    getSize(): string | SizeMapping {
        return this._size;
    }

    setOrder(value: number | SizeMapping) {
        this._order = value;
        this.updateOrder(value);
    }

    getOrder(): number | SizeMapping {
        return this._order;
    }

    private updateOrientation(value: Orientation) {
        switch (value) {
            case Orientation.horizontal:
                this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.orientationClasses.horizontal, true);
                this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.orientationClasses.vertical, false);
                break;
            case Orientation.vertical:
                this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.orientationClasses.vertical, true);
                this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.orientationClasses.horizontal, false);
                break;
        }
    }

    private updateVerticalAlignment(value: VerticalAlignment){
        this.clearVerticalAlignment();
        if(this._orientation === Orientation.horizontal){
            switch (value) {
                case VerticalAlignment.top:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.top, true);
                    break;
                case VerticalAlignment.center:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.verticalCenter, true);
                    break;
                case VerticalAlignment.bottom:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.bottom, true);
                    break;
            }
        }
        else if(this._orientation === Orientation.vertical){
            switch (value) {
                case VerticalAlignment.top:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.top, true);
                    break;
                case VerticalAlignment.center:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.verticalCenter, true);
                    break;
                case VerticalAlignment.bottom:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.bottom, true);
                    break;
            }
        }
    }

    private updateHorizontalAligment(value: HorizontalAlignment){
        this.clearHorizontalAlignment();
        if(this._orientation === Orientation.horizontal) {
                switch (value) {
                case HorizontalAlignment.left:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.left, true);
                    break;
                case HorizontalAlignment.center:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.horizontalCenter, true);
                    break;
                case HorizontalAlignment.right:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.right, true);
                    break;
            }
        }
        else if(this._orientation === Orientation.vertical) {
            switch (value) {
                case HorizontalAlignment.left:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.left, true);
                    break;
                case HorizontalAlignment.center:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.horizontalCenter, true);
                    break;
                case HorizontalAlignment.right:
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.right, true);
                    break;
            }
        }
    }

    private updateItemsSeparation(value: ItemsSeparation) {
        this.clearItemsSeparation();
        switch (value) {
            case ItemsSeparation.all:
                this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.itemsSeparationClasses.all, true);
                break;
            case ItemsSeparation.between:
                this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.itemsSeparationClasses.between, true);
                break;
        }
    }

    private updateSize(value: string | SizeMapping) {
        this.clearSize();
        if(typeof(value) === "string"){
            switch (value.toUpperCase()) {
                case "NONE":
                    this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.elementHidden, true);
                    break;
                default:
                    //TODO: Hacer enumerado RelativeSize (pensar el nombre): Fixed, AllowGrow, AllowShrink, AllowGrowShrink
                    this.setFlex(`0 0 ${value}`);
                    break;
            }
        }
        else {
          const mapping = value as SizeMapping;
          if(!mapping){
              return;
          }
          const mappingValue = this.getValueOfSize(mapping, this.flexService.currentDeviceSize) as string;
          if(!mappingValue){
              return;
          }
          this.setFlex(mappingValue);
        }
    }

    private updateOrder(value: number | SizeMapping) {
        this.clearOrder();
        if(typeof(value) === "number"){
            this.setFlexOrder(value as number);
        }
        else {
            const mapping = value as SizeMapping;
            if(!mapping){
                return;
            }
            const mappingValue = this.getValueOfSize(mapping, this.flexService.currentDeviceSize) as number;
            if(!mappingValue){
                return;
            }
            this.setFlexOrder(mappingValue);
        }
    }

    private clearHorizontalAlignment(): void {
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.left, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.horizontalCenter, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.right, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.left, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.horizontalCenter, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.right, false);
    }

    private clearVerticalAlignment(): void {
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.top, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.verticalCenter, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.verticalOrientationClasses.bottom, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.top, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.verticalCenter, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.horizontalOrientationClasses.bottom, false);
    }

    private clearItemsSeparation(): void {
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.itemsSeparationClasses.between, false);
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.itemsSeparationClasses.all, false);
    }

    private clearSize(): void {
        this.renderer.setElementClass(this.elementRef.nativeElement, FLEX_CSS_CLASSES.elementHidden, false);
        this.setFlex(undefined);
    }

    private clearOrder(): void {
        this.setOrder(undefined);
    }

    private setFlex(value: string){
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-webkit-box-flex", value)
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-moz-box-flex", value)
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-webkit-flex", value)
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-ms-flex", value)
        this.renderer.setElementStyle(this.elementRef.nativeElement, "flex", value)
    }

    private setFlexOrder(value: number){
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-webkit-box-ordinal-group", String(value))
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-moz-box-ordinal-group", String(value))
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-ms-flex-order", String(value))
        this.renderer.setElementStyle(this.elementRef.nativeElement, "-webkit-order", String(value))
        this.renderer.setElementStyle(this.elementRef.nativeElement, "order", String(value))
    }

    private getValueOfSize(mapping: SizeMapping, size: DeviceSize): string | number {
        //TODO: Agregar un mapping rule que determine que hacer con los tamaños (>=, <= ó ==)
        switch (size) {
            case DeviceSize.extraSmall:
                return mapping.extraSmall;
            case DeviceSize.small:
                return mapping.small;
            case DeviceSize.medium:
                return mapping.medium;
            case DeviceSize.large:
                return mapping.large;
        }
    }
}