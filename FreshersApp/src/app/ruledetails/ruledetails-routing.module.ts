import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { RuledetailsComponent } from "./ruledetails.component";

const routes: Routes = [
    { path: "", component: RuledetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RuledetailsRoutingModule { }
