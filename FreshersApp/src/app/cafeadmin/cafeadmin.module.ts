import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { CafeadminRoutingModule } from "./cafeadmin-routing.module";
import { CafeadminComponent } from "./cafeadmin.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CafeadminRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CafeadminComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CafeadminModule { }
