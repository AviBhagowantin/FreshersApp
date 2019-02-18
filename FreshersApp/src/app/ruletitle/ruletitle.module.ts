import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { RuletitleRoutingModule } from "./ruletitle-routing.module";
import { RuletitleComponent } from "./ruletitle.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RuletitleRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        RuletitleComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RuletitleModule { }
