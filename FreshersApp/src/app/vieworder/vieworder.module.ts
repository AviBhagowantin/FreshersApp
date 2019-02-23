import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { VieworderRoutingModule } from "./vieworder-routing.module";
import { VieworderComponent } from "./vieworder.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VieworderRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        VieworderComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VieworderModule { }
