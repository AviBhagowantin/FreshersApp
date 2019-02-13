import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BeaconmapRoutingModule } from "./beaconmap-routing.module";
import { BeaconmapComponent } from "./beaconmap.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BeaconmapRoutingModule
    ],
    declarations: [
        BeaconmapComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BeaconmapModule { }
