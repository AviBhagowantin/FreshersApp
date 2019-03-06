import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { IndoorRoutingModule } from "./indoor-routing.module";
import { IndoorComponent } from "./indoor.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        IndoorRoutingModule
    ],
    declarations: [
        IndoorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class IndoorModule { }
