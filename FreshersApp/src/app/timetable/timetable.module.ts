import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TimetableRoutingModule } from "./timetable-routing.module";
import { TimetableComponent } from "./timetable.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TimetableRoutingModule
    ],
    declarations: [
        TimetableComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TimetableModule { }
