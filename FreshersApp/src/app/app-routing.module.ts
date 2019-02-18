import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "rule", loadChildren: "~/app/rule/rule.module#RuleModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" },
    { path: "bus", loadChildren: "~/app/bus/bus.module#BusModule"},
    { path: "cpa", loadChildren: "~/app/cpa/cpa.module#CpaModule" },
    { path: "cafeteria", loadChildren: "~/app/cafeteria/cafeteria.module#CafeteriaModule" },
    { path: "menu", loadChildren: "~/app/menu/menu.module#MenuModule" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "register", loadChildren: "~/app/register/register.module#RegisterModule" },
    { path: "passreset", loadChildren: "~/app/passreset/passreset.module#PassresetModule" },
    { path: "feedback", loadChildren: "~/app/feedback/feedback.module#FeedbackModule"},
    { path: "gps", loadChildren: "~/app/gps/gps.module#GpsModule" },
    { path: "ruletitle", loadChildren: "~/app/ruletitle/ruletitle.module#RuletitleModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
