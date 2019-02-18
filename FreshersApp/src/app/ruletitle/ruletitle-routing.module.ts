import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { RuletitleComponent } from "./ruletitle.component";

const routes: Routes = [
    { path: "", component: RuletitleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RuletitleRoutingModule { }
