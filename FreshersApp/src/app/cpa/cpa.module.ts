import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CpaRoutingModule } from "./cpa-routing.module";
import { CpaComponent } from "./cpa.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CpaRoutingModule
        
    ],
    declarations: [
        CpaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CpaModule { }
