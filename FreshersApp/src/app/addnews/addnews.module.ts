import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AddnewsRoutingModule } from "./addnews-routing.module";
import { AddnewsComponent } from "./addnews.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddnewsRoutingModule
    ],
    declarations: [
        AddnewsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddnewsModule { }
