import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TimetabletimeRoutingModule } from "./timetabletime-routing.module";
import { TimetabletimeComponent } from "./timetabletime.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TimetabletimeRoutingModule
    ],
    declarations: [
        TimetabletimeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TimetabletimeModule { }
