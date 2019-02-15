import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { DatePipe } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { NavigationExtras} from "@angular/router";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Eventstart",
    moduleId: module.id,
    templateUrl: "./eventstart.component.html"
})
export class EventstartComponent implements OnInit {

    public timeSelected;
    public pathEvent;
    public pathNews;

    constructor(private router: RouterExtensions,private datePipe: DatePipe,private route: ActivatedRoute) {
        // Use the component constructor to inject providers.
        this.route.queryParams.subscribe(params => {
            this.pathEvent = params["pathEvent"];
            this.pathNews = params["pathNews"];
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onPickerLoaded(args) {
        let timePicker = <TimePicker>args.object;

        timePicker.hour = 8;
        timePicker.minute = 30;

        this.timeSelected = "08:30";
    }

    onTimeChanged(args) {
        console.log(args.value);
        this.timeSelected = this.datePipe.transform(args.value, 'HH:mm');
    }

    onNextTap(): void {
        console.log(this.timeSelected);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "pathEvent": this.pathEvent,
                "pathNews": this.pathNews,
                "startTime":this.timeSelected
            }
          };
        this.router.navigate(["/eventend"], navigationExtras);
    }

    onBackTap(): void {
        firebase.remove(this.pathEvent);
        firebase.remove(this.pathNews);
        this.router.navigate(["/admin"], { clearHistory: true });
    }
}
