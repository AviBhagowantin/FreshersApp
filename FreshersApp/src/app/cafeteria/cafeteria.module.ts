import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CafeteriaRoutingModule } from "./cafeteria-routing.module";
import { CafeteriaComponent } from "./cafeteria.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CafeteriaRoutingModule
    ],
    declarations: [
        CafeteriaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CafeteriaModule { }
