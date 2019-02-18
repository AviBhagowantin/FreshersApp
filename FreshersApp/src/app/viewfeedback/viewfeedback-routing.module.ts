import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ViewfeedbackComponent } from "./viewfeedback.component";

const routes: Routes = [
    { path: "", component: ViewfeedbackComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewfeedbackRoutingModule { }
