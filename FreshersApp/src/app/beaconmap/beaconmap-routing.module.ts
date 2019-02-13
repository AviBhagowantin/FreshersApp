import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BeaconmapComponent } from "./beaconmap.component";

const routes: Routes = [
    { path: "", component: BeaconmapComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BeaconmapRoutingModule { }
