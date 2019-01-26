import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

class Bus {

    constructor(public id: number, public route: string, public destination: string, public frequency: string, public lastBus: string){}

}

@Component({
    selector: "Bus",
    moduleId: module.id,
    templateUrl: "./bus.component.html"
})
export class BusComponent implements OnInit {

    buses: Bus[];

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
        this.buses = [
            {
                id: 0,
                route: '141',
                destination: 'Port Louis',
                frequency: '20 mins',
                lastBus: '18:35'
            },
            {
                id: 1,
                route: '15',
                destination: 'Flacq',
                frequency: '15 mins',
                lastBus: '18:40'
            },
            {
                id: 2,
                route: '2',
                destination: 'Curepipe',
                frequency: '10 mins',
                lastBus: '19:30'
            }
        ]
    }

    onItemTap(args: string): void {
        this.routerExtensions.navigate(["/businfo"], {
            transition: {
                name: "fade"
            }
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
