import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EventdateRoutingModule } from "./eventdate-routing.module";
import { EventdateComponent } from "./eventdate.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EventdateRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        EventdateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventdateModule { }
