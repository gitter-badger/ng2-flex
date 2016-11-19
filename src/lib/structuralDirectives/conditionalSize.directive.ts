import { ViewContainerRef, TemplateRef } from "@angular/core";
import { FlexService, DeviceSize } from "./../core/index";

export abstract class ConditionalSizeDirective {

    private visibility = false;

    constructor(private readonly viewContainerRef: ViewContainerRef, private readonly templateRef: TemplateRef<any>, private readonly flexService: FlexService) {
        this.flexService.onDeviceSizeChanged.subscribe(() => this.updateVisibility());
    }

    protected abstract isSizeValid(size: DeviceSize): boolean;

    protected updateVisibility(): void{
        const showTemplate = this.isSizeValid(this.flexService.currentDeviceSize);
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