import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ViewfeedbackRoutingModule } from "./viewfeedback-routing.module";
import { ViewfeedbackComponent } from "./viewfeedback.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ViewfeedbackRoutingModule
    ],
    declarations: [
        ViewfeedbackComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewfeedbackModule { }
