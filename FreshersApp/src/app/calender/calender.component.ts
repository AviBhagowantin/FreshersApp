import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as calendarModule from "nativescript-ui-calendar";
import { Color } from "color";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require('nativescript-plugin-firebase');


@Component({
    selector: "Calender",
    moduleId: module.id,
    templateUrl: "./calender.component.html"
})
export class CalenderComponent implements OnInit {

    public events: any;
    public keys: any;


    calendarEvents = [];

    constructor(private router: RouterExtensions) {

    }
     onNextTap(): void {
      this.router.navigate(["/calenderevent"], { clearHistory: true });

     }
    ngOnInit(): void {
        firebase.getCurrentUser()
        .then(
            function(user) {
                firebase.query(result => {
                    console.log(result.value.events);
                    this.calendarEvents=this.getData(result.value.events);
                    }, "/User", {
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'Email'
                    },
                    ranges: [
                        {
                        type: firebase.QueryRangeType.START_AT,
                        value: user.email
                        },
                        {
                        type: firebase.QueryRangeType.END_AT,
                        value: user.email
                        }
                    ]
                })
            }.bind(this)
        )
        .catch(error => console.log("Trouble in paradise: " + error));

        console.log(this.calendarEvents);
    }

    onDateSelected(args) {
        console.log("onDateSelected: " + args.date);
    }

    onDateDeselected(args) {
        console.log("onDateDeselected: " + args.date);
    }

    onNavigatedToDate(args) {
        console.log("onNavigatedToDate: " + args.date);
    }

    onNavigatingToDateStarted(args) {
        console.log("onNavigatingToDateStarted: " + args.date);
    }

    onViewModeChanged(args) {
        console.log("onViewModeChanged: " + args.newValue);
    }

    getData(data : any): any{
        let startDate;
        let endDate;
        let colors = new Color(250,25,25,112);
        let now = new Date();

        this.keys=Object.keys(data); 
        console.log(this.keys);
        var counter : number;
        var eventsArray = [];
        for (counter = 0; counter < this.keys.length; counter++) {
            var key = this.keys[counter];
            var startd=data[key].startdate;
            var starttime=data[key].starttime;
            var endtime=data[key].endtime;
            var note=data[key].note;
            var month=startd[3]+startd[4];
            startd=startd[0]+startd[1];
            var starttimemin= starttime[3]+starttime[4];
            var endtimemin= endtime[3]+endtime[4];
            starttime=starttime[0]+starttime[1];
            endtime=endtime[0]+endtime[1];
            startDate = new Date(now.getFullYear(), month-1, startd, starttime,starttimemin);
            endDate = new Date(now.getFullYear(), month-1, startd, endtime,endtimemin);
            let event = new calendarModule.CalendarEvent(note, startDate, endDate, false, colors);
            eventsArray.push(event);
        } 

        return eventsArray;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
