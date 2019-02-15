import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EventstartRoutingModule } from "./eventstart-routing.module";
import { EventstartComponent } from "./eventstart.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EventstartRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        EventstartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventstartModule { }
