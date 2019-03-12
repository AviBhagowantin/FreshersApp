import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { UpdatecreditsRoutingModule } from "./updatecredits-routing.module";
import { UpdatecreditsComponent } from "./updatecredits.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UpdatecreditsRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        UpdatecreditsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UpdatecreditsModule { }
