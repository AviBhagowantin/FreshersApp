import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { PassresetRoutingModule } from "./passreset-routing.module";
import { PassresetComponent } from "./passreset.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PassresetRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        PassresetComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PassresetModule { }
