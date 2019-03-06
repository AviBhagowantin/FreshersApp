import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { IndoorComponent } from "./indoor.component";

const routes: Routes = [
    { path: "", component: IndoorComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class IndoorRoutingModule { }
