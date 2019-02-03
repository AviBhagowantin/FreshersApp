import { Component, OnInit, NgZone } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
    

@Component({
    selector: "Bus",
    moduleId: module.id,
    templateUrl: "./bus.component.html"
})
export class BusComponent implements OnInit {

    public buses : any;
    public keys : any;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getValue('/Buses')
            .then(result=> (this.buses=this.getData(result)))
            .catch(error => console.error("Error: " + error));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getData(data : any): any{

        this.keys=Object.keys(data.value); 

        var counter : number;
        var busArray = [];

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];

            var bus = {
                route: data.value[key].route,
                destination: data.value[key].destination,
                frequency: data.value[key].frequency,
                lastBus: data.value[key].lastBus
            };

            busArray.push(bus);
        } 

        return busArray;
    }
}
