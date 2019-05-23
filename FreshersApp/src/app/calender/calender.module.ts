import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { CalenderRoutingModule } from "./calender-routing.module";
import { CalenderComponent } from "./calender.component";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        CalenderRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUICalendarModule
    ],
    declarations: [
        CalenderComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CalenderModule { }
