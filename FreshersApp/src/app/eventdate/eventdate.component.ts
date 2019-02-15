import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { DatePipe } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { NavigationExtras} from "@angular/router";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Eventdate",
    moduleId: module.id,
    templateUrl: "./eventdate.component.html"
})
export class EventdateComponent implements OnInit {

    public eventKey;
    public newsKey;
    public dateSelected;
    public pathEvent;
    public pathNews;

    constructor(private router: RouterExtensions,private datePipe: DatePipe,private route: ActivatedRoute) {
        // Use the component constructor to inject providers.
        this.route.queryParams.subscribe(params => {
            this.eventKey = params["eventKey"];
            this.newsKey = params["newsKey"];
        });
        this.pathEvent="/Events/"+this.eventKey;
        this.pathNews="/News/"+this.newsKey;
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onPickerLoaded(args) {
        var date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        var nowYear = +(date[6]+date[7]+date[8]+date[9]);
        var nowMonth = +(date[3]+date[4]);
        var nowDay = +(date[0]+date[1]);
        let datePicker = <DatePicker>args.object;

        datePicker.year = nowYear;
        datePicker.month = nowMonth;
        datePicker.day = nowDay;
        datePicker.minDate = new Date(nowYear, nowMonth, nowDay);
        datePicker.maxDate = new Date(2045, 4, 12);
        this.dateSelected = this.datePipe.transform(datePicker.minDate, 'dd-MM-yyyy');
    }

    onDateChanged(args) {
        // console.log("Date New value: " + args.value);
        // console.log("Date value: " + args.oldValue);

        this.dateSelected = this.datePipe.transform(args.value, 'dd-MM-yyyy');
    }

    onNextTap(): void {
        console.log(this.dateSelected);
        firebase.update(
            this.pathEvent,
            {'date':this.dateSelected}
        );
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "pathEvent": this.pathEvent,
                "pathNews": this.pathNews
            }
          };
          this.router.navigate(["/eventstart"], navigationExtras);
    }

    onBackTap(): void {
        firebase.remove(this.pathEvent);
        firebase.remove(this.pathNews);
        this.router.navigate(["/admin"], { clearHistory: true });
    }
}
