import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EventmapRoutingModule } from "./eventmap-routing.module";
import { EventmapComponent } from "./eventmap.component";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

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
