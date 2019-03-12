import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CafeteriaComponent } from "./cafeteria.component";

const routes: Routes = [
    { path: "", component: CafeteriaComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CafeteriaRoutingModule { }
