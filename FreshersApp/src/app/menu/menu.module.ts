import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MenuRoutingModule
    ],
    declarations: [
        MenuComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MenuModule { }
