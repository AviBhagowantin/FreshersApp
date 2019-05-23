import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as calendarModule from "nativescript-ui-calendar";
import { Color } from "color";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "Calender",
    moduleId: module.id,
    templateUrl: "./calender.component.html"
})
export class CalenderComponent implements OnInit {

   

    calendarEvents = [];

    constructor(private router: RouterExtensions) {
        let events = [];
        let now = new Date();
        let startDate;
        let endDate;
        let colors = new Color(200,188,26,214);
        startDate = new Date(now.getFullYear(), now.getMonth(), 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 10, 3);
        let event = new calendarModule.CalendarEvent("event", startDate, endDate, false, colors);

        events.push(event);
        event = new calendarModule.CalendarEvent("event2", startDate, endDate, false, colors);
        events.push(event);
       
        
        this.calendarEvents = events;
    }
     onNextTap(): void {
      this.router.navigate(["/calenderevent"], { clearHistory: true });

     }
    ngOnInit(): void {
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



    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
