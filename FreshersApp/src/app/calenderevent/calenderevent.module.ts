import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { CalendereventRoutingModule } from "./calenderevent-routing.module";
import { CalendereventComponent } from "./calenderevent.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CalendereventRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CalendereventComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CalendereventModule { }
