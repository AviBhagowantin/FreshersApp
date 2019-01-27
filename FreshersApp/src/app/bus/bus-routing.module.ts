import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BusComponent } from "./bus.component";

const routes: Routes = [
    { path: "", component: BusComponent },
    { path: "businfo", loadChildren: "~/app/businfo/businfo.module#BusinfoModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BusRoutingModule { }
