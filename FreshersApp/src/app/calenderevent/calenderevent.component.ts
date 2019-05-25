import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { DatePicker } from "tns-core-modules/ui/date-picker";
var firebase = require('nativescript-plugin-firebase');
import { LocalNotifications } from "nativescript-local-notifications";
import { DatePipe } from '@angular/common';
import { Color } from "color";


@Component({
    selector: "Calenderevent",
    moduleId: module.id,
    templateUrl: "./calenderevent.component.html"
})
export class CalendereventComponent implements OnInit {
    public path: any;
    public note: any;
    public timeSelectedStart;
    public timeSelectedEnd;
   
    public dateSelected;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
       
    }

    ngOnInit(): void {
        // Init your component properties here.
        firebase.getCurrentUser()
            .then(
                function(user) {
                    firebase.query(result => {
                        //console.log("query result:", JSON.stringify(result));
                        //console.log(result.key);
                        this.path='/User/'+result.key;
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
        this.timeSelectedEnd = "08:30";
    }

   

    onTimeChanged(args) {
        //console.log(args.value);
        this.timeSelectedStart = this.datePipe.transform(args.value, 'HH:mm');
    }

    onEndTimeChanged(args) {
        //console.log(args.value);
        this.timeSelectedEnd = this.datePipe.transform(args.value, 'HH:mm');
    }

    onNextTap(): void {
        var dates = new Date(this.dateSelected[6]+this.dateSelected[7]+this.dateSelected[8]+this.dateSelected[9],(this.dateSelected[3]+this.dateSelected[4])-1,this.dateSelected[0]+this.dateSelected[1]);
        dates.setDate(dates.getDate()-3)
        dates.setHours(dates.getHours()+(this.timeSelectedStart[0]+this.timeSelectedStart[1]));
        dates.setMinutes(dates.getMinutes()+(this.timeSelectedStart[3]+this.timeSelectedStart[4]));
        console.log(dates);
        
         LocalNotifications.schedule(
                [{
                  id: Math.floor(Math.random() * (100000000 - 1 + 1)) + 1,
                  thumbnail: true,
                  title: 'Calender Notification',
                  body: this.note,
                  icon: 'res://logo',
                  forceShowWhenInForeground: true,
                  at: dates,
                  actions: [
                    {
                      id: "input-richard",
                      type: "input",
                      title: "Tap here to reply",
                      placeholder: "Type to reply..",
                      submitLabel: "Reply",
                      launch: true,
                      editable: true,
                      // choices: ["Red", "Yellow", "Green"] // TODO Android only, but yet to see it in action
                    }
                  ]
                }])
                .then(() => {
                  alert({
                    title: "Notification scheduled",
                    message: "You will get a notification 3 days prior to the event",
                    okButtonText: "OK, thanks"
                  });
                })
        .catch(error => console.log("doScheduleId5WithInput error: " + error));



        if (!this.note)
        {
            this.note="";
        }
        this.path=this.path + '/events';
        firebase.push(
            this.path,
            {
                'startdate':this.dateSelected,
                'starttime':this.timeSelectedStart,
                'endtime':this.timeSelectedEnd,
                'note':this.note
            }
        ).then(
            function (result) {
                //console.log("created key: " + result.key);
                this.router.navigate(['/calender'], { clearHistory: true });
            }.bind(this)
        );
    }
}
