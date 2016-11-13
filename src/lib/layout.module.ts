import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutService, LayoutContainerComponent } from "./core/index";

import { GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent } from "./grid/index";

import { MaxSizeDirective, MinSizeDirective, SizeDirective } from "./conditionalSizeDirective/index";

@NgModule({
    imports: [CommonModule],
    declarations: [LayoutContainerComponent, GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent, MaxSizeDirective, MinSizeDirective, SizeDirective],
    exports: [LayoutContainerComponent, GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent, MaxSizeDirective, MinSizeDirective, SizeDirective],
    providers: [LayoutService]
})
export class LayoutModule { }