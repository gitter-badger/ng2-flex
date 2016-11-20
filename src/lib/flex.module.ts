import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FlexService/*, FlxPanelComponent*/, FlxContainerComponent } from "./core/index";

import { FlxGridComponent, FlxColumnComponent, FlxRowComponent } from "./grid/index";

import { FlxMaxSizeDirective, FlxMinSizeDirective, FlxSizeDirective } from "./structuralDirectives/index";

import { FlxClassDirective } from "./attributeDirectives/index";

@NgModule({
    imports: [CommonModule],
    declarations: [//FlxPanelComponent,
                   FlxContainerComponent, 
                   FlxGridComponent, 
                   FlxColumnComponent, 
                   FlxRowComponent, 
                   FlxMaxSizeDirective, 
                   FlxMinSizeDirective, 
                   FlxSizeDirective, 
                   FlxClassDirective],
    exports: [//FlxPanelComponent,
              FlxContainerComponent, 
              FlxGridComponent, 
              FlxColumnComponent, 
              FlxRowComponent, 
              FlxMaxSizeDirective, 
              FlxSizeDirective, 
              FlxClassDirective],
    providers: [FlexService]
})
export class FlexModule { }