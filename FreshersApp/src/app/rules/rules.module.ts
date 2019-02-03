import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RulesRoutingModule } from "./rules-routing.module";
import { RulesComponent } from "./rules.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RulesRoutingModule
    ],
    declarations: [
        RulesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RulesModule { }
