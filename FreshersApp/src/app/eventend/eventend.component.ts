import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { DatePipe } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { NavigationExtras} from "@angular/router";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Eventend",
    moduleId: module.id,
    templateUrl: "./eventend.component.html"
})
export class EventendComponent implements OnInit {

    public timeSelected;
    public pathEvent;
    public pathNews;
    public startTime;
    public eventKey;
    public dateSelected;

    constructor(private router: RouterExtensions,private datePipe: DatePipe,private route: ActivatedRoute) {
        // Use the component constructor to inject providers.
        this.route.queryParams.subscribe(params => {
            this.pathEvent = params["pathEvent"];
            this.pathNews = params["pathNews"];
            this.startTime = params["startTime"];
            this.eventKey = params["eventKey"];
            this.dateSelected = params["date"];
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onPickerLoaded(args) {
        let timePicker = <TimePicker>args.object;

        timePicker.hour = 16;
        timePicker.minute = 30;

        this.timeSelected = "16:30";
    }

    onTimeChanged(args) {
        console.log(args.value);
        this.timeSelected = this.datePipe.transform(args.value, 'HH:mm');
    }

    onNextTap(): void {
        console.log(this.timeSelected);
        this.timeSelected = "From " + this.startTime + " to " + this.timeSelected;
        firebase.update(
            this.pathEvent,
            {'time':this.timeSelected}
        );
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "pathEvent": this.pathEvent,
                "pathNews": this.pathNews,
                "eventKey": this.eventKey,
                "date": this.dateSelected
            }
          };
        this.router.navigate(["/eventmap"], navigationExtras);
    }

    onBackTap(): void {
        firebase.remove(this.pathEvent);
        firebase.remove(this.pathNews);
        this.router.navigate(["/admin"], { clearHistory: true });
    }
}
