import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutService, LayoutContainerComponent } from "./core/index";

import { GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent } from "./grid/index";

import { MaxSizeDirective, MinSizeDirective, SizeDirective, SizeClassDirective  } from "./directives/index";

@NgModule({
    imports: [CommonModule],
    declarations: [LayoutContainerComponent, GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent, MaxSizeDirective, MinSizeDirective, SizeDirective, SizeClassDirective],
    exports: [LayoutContainerComponent, GridLayoutComponent, ColumnLayoutComponent, RowLayoutComponent, MaxSizeDirective, MinSizeDirective, SizeDirective, SizeClassDirective],
    providers: [LayoutService]
})
export class LayoutModule { }