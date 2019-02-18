import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import {ActivatedRoute} from '@angular/router';
import { RouterExtensions} from 'nativescript-angular/router';
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: 'Timetabletime',
    moduleId: module.id,
    templateUrl: './timetabletime.component.html'
})
export class TimetabletimeComponent implements OnInit {

    public Day:string;
    public webViewSrc;
    public keys : any;
    public path = "/Timetable/";
    public room : Room[] = [];
    public header="<!DOCTYPE html><html lang='en'><head><title>Page Title</title><meta charset='UTF-8'>  <link rel='stylesheet' href='https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css'> <script src='https://code.jquery.com/jquery-3.3.1.js'></script><script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script><script>$(document).ready(function() {    $('#example').DataTable( {'scrollX': true} );} );</script> </head><body></body>  <table id='example' class='display nowrap' style='width:100%'> <thead> <tr> <th>Room</th> <th>8:30 - 10:30h</th> <th>10:30 - 12:30</th> <th>12:30 - 14:30h</th> <th>14:30 - 16:30h</th> <th>16:30 - 18:30h</th></tr> </thead><tbody>";
   
    constructor(private route: ActivatedRoute,private router: RouterExtensions) {
        
    }

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            this.Day = params['Day'];           
        });

        if (this.Day=="1")
        {
            this.Day="Monday";
        }
        else if (this.Day=="2")
        {
            this.Day="Tuesday";
        }
        else if (this.Day=="3")
        {
            this.Day="Wednesday";
        }
        else if (this.Day=="4")
        {
            this.Day="Thursday";
        }
        else if (this.Day=="5")
        {
            this.Day="Friday";
        }
        else if (this.Day=="6")
        {
            this.Day="Saturday";
        }

        this.path = this.path + this.Day;

        firebase.getValue(this.path)
        .then(result=> (this.getData(result)))
        .catch(error => console.error("Error: " + error));

        //console.log(this.room);

        // for(let i=0;i<this.room.length;i++)
        // {
        //     var tbody="<tr><td>"+this.room[i].name+"</td><td>"+this.room[i].time1+"</td><td>"+this.room[i].time2+"</td><td>"+this.room[i].time5+"</td><td>"+this.room[i].time4+"</td><td>"+this.room[i].time5+"</td></tr>";
        //     this.header=this.header.concat(tbody);
        // }


        // this.webViewSrc=this.header.concat("</tbody></body></html>");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getData(data : any): any{
        // console.log(data.value);

        this.keys=Object.keys(data.value); 

        var counter : number;
        let room: Room[] = [];

        // console.log(data.value[this.keys[0]]);
        // console.log(data.value[this.keys[0]].time1);

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];

            var room_details = new Room(key,data.value[key].time1,data.value[key].time2,data.value[key].time3,data.value[key].time4,data.value[key].time5);

            console.log(room_details);

            room.push(room_details);
        } 

        console.log(room);

        for(let i=0;i<room.length;i++)
        {
            var tbody="<tr><td>"+room[i].name+"</td><td>"+room[i].time1+"</td><td>"+room[i].time2+"</td><td>"+room[i].time5+"</td><td>"+room[i].time4+"</td><td>"+room[i].time5+"</td></tr>";
            this.header=this.header.concat(tbody);
        }


        this.webViewSrc=this.header.concat("</tbody></body></html>");
        //return room;
    }

    onBackTap(): void {
        this.router.navigate(['/timetable'], { clearHistory: true });
    }

   
}



class Room {
    constructor(public name: string,public time1:string,public time2:string,public time3:string,public time4:string,public time5:string) { }
}
