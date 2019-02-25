import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AddnewscafeComponent } from "./addnewscafe.component";

const routes: Routes = [
    { path: "", component: AddnewscafeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AddnewscafeRoutingModule { }
