import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AddcreditsRoutingModule } from "./addcredits-routing.module";
import { AddcreditsComponent } from "./addcredits.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddcreditsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddcreditsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddcreditsModule { }
