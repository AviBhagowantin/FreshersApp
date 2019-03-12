import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {ActivatedRoute} from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require('nativescript-plugin-firebase');
import { DatePipe } from '@angular/common';
const httpModule = require("http");
import { registerElement } from "nativescript-angular/element-registry";
registerElement("Mapbox1", () => require("nativescript-mapbox").MapboxView);
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    selector: "Eventmap",
    moduleId: module.id,
    templateUrl: "./eventmap.component.html"
})
export class EventmapComponent implements OnInit {

    public events: any;
    public keys: any;

    public eventLat=0;
    public eventLng=0;

    public pathEvent: any;
    public pathNews : any;
    public eventKey: any;
    public dateSelected: any;

    public description;
    public title;

    constructor(private router: RouterExtensions,private datePipe: DatePipe,private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.pathEvent = params["pathEvent"];
            this.pathNews = params["pathNews"];
            this.eventKey = params["eventKey"];
            this.dateSelected = params["date"];
        });
    }

    ngOnInit(): void {

        firebase.getValue('/Events')
        .then(result=> (this.events=this.getData(result)))
        .catch(error => console.error("Error: " + error));

        firebase.getValue(this.pathNews)
        .then(result=> (this.title=result.value.Title))
        .catch(error => console.error("Error: " + error));

        firebase.getValue(this.pathNews)
        .then(result=> (this.description=result.value.Description))
        .catch(error => console.error("Error: " + error));

        // console.log(this.title);
        // console.log(this.description);
        
    }

    onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: -20.233983, // mandatory
                lng: 57.4972365, // mandatory
                animated: true, // default true
                zoomLevel: 16
            }
        );
        args.map.addMarkers(this.events);
        args.map.setOnMapClickListener((point: any) => {
            console.log("Map clicked at latitude: " + point.lat + ", longitude: " + point.lng);
            this.eventLat=point.lat;
            this.eventLng=point.lng;
            console.log(this.eventKey);
            console.log(this.eventLat);
            console.log(this.eventLng);
            args.map.removeMarkers([this.eventKey]);
            args.map.addMarkers([
                {
                    id: this.eventKey, // can be user in 'removeMarkers()'
                    lat: this.eventLat, // mandatory
                    lng: this.eventLng, // mandatory
                }
            ]);
          });
    }

    getData(data : any): any{
        this.keys=Object.keys(data.value); 
        var counter : number;
        var eventsArray = [];

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

            var eventDate=this.dateSelected;
            console.log(eventDate);

            if ((eventDate==events_details.date) && (this.eventKey!=events_details.id))
            {
                eventsArray.push(events_details);
            }
        } 

        //console.log(newsArray);
        return eventsArray;
    }

    onAddTap(): void {

        if (this.eventLat==0 || this.eventLng==0)
        {
            dialogs.alert({
                title: "No Location Selected",
                message: "Please tap on the location where you want to organize the event.",
                okButtonText: "Okay"
            });
        }
        else {
            firebase.update(
                this.pathEvent,
                {
                    'lat':this.eventLat,
                    'lng':this.eventLng
                }
            );
    
            httpModule.request({
                url: "https://fcm.googleapis.com/fcm/send",
                method: "POST",
                headers: {'Authorization': 'key=AAAACn6RBCk:APA91bF1vgYQbPk4P-AGNGewCBjIQc10wlYI5sz9y_kyYdBgbB2ScpxExjbaKvdeEHU6QkiXSZlYYkYBLRdkdueO6OCEM4C9nJS5pDA0PRn1REJPIGMKnvmLlYWRofkwzvSh2nNvNnz6', 'Content-Type': 'application/json' },
                content: JSON.stringify({
                    "notification" : {
                        "body": this.description,
                        "title": this.title,
                        "sound": "default",
                        "priority": "High",
                        "time_to_live": "0", 
    
                    },
                    'to': "/topics/news" // its is mandatory to have /topics/ before the topic name
                })
            }).then(function(response) {
                //const result = response.content.toJSON();
                console.log(JSON.stringify(response));
            }, function (e) {
                  console.log("Error occurred " + JSON.stringify(e));
            }).then(
                function (result) {
                    //console.log("created key: " + result.key);
                }
            );
    
            this.router.navigate(["/admin"], { clearHistory: true });
        }

    }

    onBackTap(): void {
        firebase.remove(this.pathEvent);
        firebase.remove(this.pathNews);
        this.router.navigate(["/admin"], { clearHistory: true });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
}
