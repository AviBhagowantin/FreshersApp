import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EventendRoutingModule } from "./eventend-routing.module";
import { EventendComponent } from "./eventend.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EventendRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        EventendComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventendModule { }
