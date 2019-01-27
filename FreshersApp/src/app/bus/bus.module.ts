import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BusRoutingModule } from "./bus-routing.module";
import { BusComponent } from "./bus.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BusRoutingModule
    ],
    declarations: [
        BusComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BusModule { }
