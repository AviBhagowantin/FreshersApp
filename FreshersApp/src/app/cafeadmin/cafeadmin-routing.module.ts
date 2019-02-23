import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CafeadminComponent } from "./cafeadmin.component";

const routes: Routes = [
    { path: "", component: CafeadminComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CafeadminRoutingModule { }
