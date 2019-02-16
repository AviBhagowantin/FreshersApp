import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EventmapRoutingModule } from "./eventmap-routing.module";
import { EventmapComponent } from "./eventmap.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EventmapRoutingModule
    ],
    declarations: [
        EventmapComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EventmapModule { }
