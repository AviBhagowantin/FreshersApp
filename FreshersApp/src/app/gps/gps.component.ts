import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var Directions = require("nativescript-directions").Directions;
import { Accuracy } from "ui/enums";
import * as geolocation from "nativescript-geolocation";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require('nativescript-plugin-firebase');
import { DatePipe } from '@angular/common';
import * as dialogs from "tns-core-modules/ui/dialogs";

let directions = new Directions();

@Component({
    selector: "Gps",
    moduleId: module.id,
    templateUrl: "./gps.component.html"
})
export class GpsComponent implements OnInit {

    public currentLat = -20.233983;
    public currentLng = 57.4972365;

    public navLat = 0;
    public navLng = 0;
    public navKey = "kjfndvkjdfnv65465fdkvnk";

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

        args.map.trackUser({
            mode: "FOLLOW_WITH_HEADING", // "NONE" | "FOLLOW" | "FOLLOW_WITH_HEADING" | "FOLLOW_WITH_COURSE"
            animated: true
        });

        args.map.setOnMapLongClickListener((point: any) => {
            console.log("Map clicked at latitude: " + point.lat + ", longitude: " + point.lng);
            this.navLat=point.lat;
            this.navLng=point.lng;
            console.log(this.navKey);
            console.log(this.navLat);
            console.log(this.navLng);
            args.map.removeMarkers([this.navKey]);
            args.map.addMarkers([
                {
                    id: this.navKey, // can be user in 'removeMarkers()'
                    lat: this.navLat, // mandatory
                    lng: this.navLng, // mandatory
                }
            ]);
          });
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
            console.log(this.currentLat);
            console.log(this.currentLng);
        }, e => {
            console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    onNavigateTap(): void {
        if (this.navLat==0 || this.navLng==0)
        {
            dialogs.alert({
                title: "Unknown Location",
                message: "Please press and hold on the location where you want to navigate to until a marker appears.",
                okButtonText: "Okay"
            }).then(() => {
                console.log("Dialog closed!");
            });
        }
        else
        {
            directions.navigate({
                to: { // if an Array is passed (as in this example), the last item is the destination, the addresses in between are 'waypoints'.
                    lat: this.navLat,
                    lng: this.navLng
                },
                type: "walking", // optional, can be: driving, transit, bicycling or walking
                ios: {
                  preferGoogleMaps: true, // If the Google Maps app is installed, use that one instead of Apple Maps, because it supports waypoints. Default true.
                  allowGoogleMapsWeb: true // If waypoints are passed in and Google Maps is not installed, you can either open Apple Maps and the first waypoint is used as the to-address (the rest is ignored), or you can open Google Maps on web so all waypoints are shown (set this property to true). Default false.
                }
            }).then(() => {
                  console.log("Maps app launched.");
            }, error => {
                  console.log(error);
            });
        }
    }

    onBackTap(): void {
        this.router.navigate(['/home'], { clearHistory: true });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
}
