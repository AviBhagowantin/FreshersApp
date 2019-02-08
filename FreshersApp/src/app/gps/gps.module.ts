import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GpsRoutingModule } from "./gps-routing.module";
import { GpsComponent } from "./gps.component";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GpsRoutingModule
    ],
    declarations: [
        GpsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GpsModule { }
