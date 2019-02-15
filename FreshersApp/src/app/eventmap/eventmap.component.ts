import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { Accuracy } from "ui/enums";
import * as geolocation from "nativescript-geolocation";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require('nativescript-plugin-firebase');
import { DatePipe } from '@angular/common';

@Component({
    selector: "Eventmap",
    moduleId: module.id,
    templateUrl: "./eventmap.component.html"
})
export class EventmapComponent implements OnInit {

    currentLat: number;
    currentLng: number;

    public events: any;
    public keys : any;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {

    }

    ngOnInit(): void {

        firebase.getValue('/Events')
        .then(result=> (this.events=this.getData(result)))
        .catch(error => console.error("Error: " + error));


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
            this.watch();
        }, e => {
            console.log('Failed to enable', e);
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
        );

        args.map.addMarkers(this.events);
    }

    getData(data : any): any{
        //console.log(data.value);

        this.keys=Object.keys(data.value); 

        var counter : number;
        var eventsArray = [];

        //console.log(data.value[this.keys[0]]);
        //console.log(data.value[this.keys[0]].title);

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];

            var events_details = {
                id: key,
                title: data.value[key].title,
                subtitle: data.value[key].time,
                date: data.value[key].date,
                lat: data.value[key].lat,
                lng: data.value[key].lng
            };

            var todayDate=this.datePipe.transform(Date.now(), 'dd-MM-yyyy');

            if (todayDate==events_details.date)
            {
                eventsArray.push(events_details);
            }
        } 

        //console.log(newsArray);
        return eventsArray;
    }

    onBackTap(): void {
        // firebase.remove(this.pathEvent);
        // firebase.remove(this.pathNews);
        this.router.navigate(["/admin"], { clearHistory: true });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
}
