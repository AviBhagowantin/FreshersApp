import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { MenuRoutingModule } from "./menu-routing.module";
import { MenuComponent } from "./menu.component";
import { AccordionModule } from "nativescript-accordion/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MenuRoutingModule,
        AccordionModule,
        TNSCheckBoxModule

    ],
    declarations: [
        MenuComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MenuModule { }
