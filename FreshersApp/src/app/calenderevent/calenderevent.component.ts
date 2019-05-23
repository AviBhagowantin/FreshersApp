import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { DatePicker } from "tns-core-modules/ui/date-picker";

import { DatePipe } from '@angular/common';


@Component({
    selector: "Calenderevent",
    moduleId: module.id,
    templateUrl: "./calenderevent.component.html"
})
export class CalendereventComponent implements OnInit {
    public path: any;
    public timeSelectedStart;
   
    public dateSelected;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
       
    }

    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onPickerLoadedDate(args) {
        var date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        var nowYear = +(date[6]+date[7]+date[8]+date[9]);
        var nowMonth = +(date[3]+date[4]);
        var nowDay = +(date[0]+date[1]);
        let datePicker = <DatePicker>args.object;

        nowMonth=nowMonth-1;

        datePicker.year = nowYear;
        datePicker.month = nowMonth;
        datePicker.day = nowDay;
        datePicker.minDate = new Date(nowYear, nowMonth, nowDay);
        datePicker.maxDate = new Date(2045, 4, 12);
        this.dateSelected = this.datePipe.transform(datePicker.minDate, 'dd-MM-yyyy');
        console.log(this.dateSelected);
    }

    onDateChanged(args) {
        // console.log("Date New value: " + args.value);
        // console.log("Date value: " + args.oldValue);

        this.dateSelected = this.datePipe.transform(args.value, 'dd-MM-yyyy');
    }


     onPickerLoaded(args) {
        let timePicker = <TimePicker>args.object;

        timePicker.hour = 8;
        timePicker.minute = 30;

        this.timeSelectedStart = "08:30";
    }

   

    onTimeChanged(args) {
        console.log(args.value);
        this.timeSelectedStart = this.datePipe.transform(args.value, 'HH:mm');
    }

    
}
