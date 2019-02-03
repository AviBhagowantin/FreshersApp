import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RuledetailsRoutingModule } from "./ruledetails-routing.module";
import { RuledetailsComponent } from "./ruledetails.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RuledetailsRoutingModule
    ],
    declarations: [
        RuledetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RuledetailsModule { }
