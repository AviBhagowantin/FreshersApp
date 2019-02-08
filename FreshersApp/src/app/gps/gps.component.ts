import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Accuracy } from "ui/enums";
import * as geolocation from "nativescript-geolocation";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Gps",
    moduleId: module.id,
    templateUrl: "./gps.component.html"
})
export class GpsComponent implements OnInit {

    currentLat: number;
    currentLng: number;

    constructor(private router: RouterExtensions) {

    }

    ngOnInit(): void {


        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
               this.watch();
            } else {
               this.request();
            }
        }, e => {
            console.log('isEnabled error', e);
            this.request();
        });
        
    }

    request() {
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            console.log('location enabled!');
            //this.watch();
        }, e => {
            console.log('Failed to enable', e);
        });
        
        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
               this.watch();
            } else {
                console.log('Location is not enabled');
            }
        }, e => {
            console.log('isEnabled error', e);
        });
    }

    watch() {
        console.log('watchLocation()');
        geolocation.watchLocation(position => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
        }, e => {
            console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: this.currentLat, // mandatory
                lng: this.currentLng, // mandatory
                animated: true, // default true
                zoomLevel: 16
            }
        )
    }

    onBackTap(): void {
        this.router.navigate(['/home'], { clearHistory: true });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
}
