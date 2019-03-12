import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AddnewscafeRoutingModule } from "./addnewscafe-routing.module";
import { AddnewscafeComponent } from "./addnewscafe.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddnewscafeRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddnewscafeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddnewscafeModule { }
