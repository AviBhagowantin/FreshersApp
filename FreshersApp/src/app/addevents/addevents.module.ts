import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AddeventsRoutingModule } from "./addevents-routing.module";
import { AddeventsComponent } from "./addevents.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddeventsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddeventsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddeventsModule { }
