import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FeedbackRoutingModule } from "./feedback-routing.module";
import { FeedbackComponent } from "./feedback.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FeedbackRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        FeedbackComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeedbackModule { }
