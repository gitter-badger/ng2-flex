import { ViewContainerRef, TemplateRef } from "@angular/core";
import { LayoutService, DeviceSize } from "./../core/index";

export abstract class ConditionalSizeDirective {

    private visibility = false;

    constructor(private readonly viewContainerRef: ViewContainerRef, private readonly templateRef: TemplateRef<any>, private readonly layoutService: LayoutService) {
        this.layoutService.onDeviceSizeChanged.subscribe(() => this.updateVisibility());
    }

    protected abstract isSizeValid(size: DeviceSize): boolean;

    protected updateVisibility(): void{
        const showTemplate = this.isSizeValid(this.layoutService.currentDeviceSize);
        if(this.visibility === showTemplate){
            return;
        }
        this.visibility = showTemplate;
        if(showTemplate){
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainerRef.clear();
        }
    }
}