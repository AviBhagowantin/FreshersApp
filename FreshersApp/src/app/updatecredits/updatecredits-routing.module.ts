import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { UpdatecreditsComponent } from "./updatecredits.component";

const routes: Routes = [
    { path: "", component: UpdatecreditsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UpdatecreditsRoutingModule { }
