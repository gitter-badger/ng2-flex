import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutService, LayoutContainerComponent } from "./core/index";

import { GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent } from "./grid/index";

import { MaxSizeDirective, MinSizeDirective, SizeDirective, FlexClassDirective  } from "./directives/index";

@NgModule({
    imports: [CommonModule],
    declarations: [LayoutContainerComponent, GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent, MaxSizeDirective, MinSizeDirective, SizeDirective, FlexClassDirective],
    exports: [LayoutContainerComponent, GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent, MaxSizeDirective, MinSizeDirective, SizeDirective, FlexClassDirective],
    providers: [LayoutService]
})
export class LayoutModule { }