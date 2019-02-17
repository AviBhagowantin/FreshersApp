import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import {ActivatedRoute} from '@angular/router';
import { RouterExtensions} from 'nativescript-angular/router';
import { NavigationExtras} from '@angular/router'

@Component({
    selector: 'Timetabletime',
    moduleId: module.id,
    templateUrl: './timetabletime.component.html'
})
export class TimetabletimeComponent implements OnInit {

    public Day:string;
    public webViewSrc;
   


    constructor(private route: ActivatedRoute) {
        
    }

    ngOnInit(): void {
        let room: Room[] = [];
        room.push(new Room("Room 1.0","Free","Computer Science Year 1","Software Engineering Year 2","Applied Computing Year 4","Computer Masters Year1"));

        
        
        
        this.route.queryParams.subscribe(params => {
            this.Day = params['Day'];
            
        });

        var header="<!DOCTYPE html><html lang='en'><head><title>Page Title</title><meta charset='UTF-8'>  <link rel='stylesheet' href='https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css'> <script src='https://code.jquery.com/jquery-3.3.1.js'></script><script src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'></script><script>$(document).ready(function() {    $('#example').DataTable( {'scrollX': true} );} );</script> </head><body></body>  <table id='example' class='display nowrap' style='width:100%'> <thead> <tr> <th>Room</th> <th>8:30 - 10:30h</th> <th>10:30 - 12:30</th> <th>12:30 - 14:30h</th> <th>14:30 - 16:30h</th> <th>16:30 - 18:30h</th></tr> </thead><tbody>";


        for(let i=0;i<room.length;i++)
        {
            var tbody="<tr><td>"+room[i].name+"</td><td>"+room[i].time1+"</td><td>"+room[i].time2+"</td><td>"+room[i].time5+"</td><td>"+room[i].time4+"</td><td>"+room[i].time5+"</td></tr>";
            header=header.concat(tbody);
        }


        this.webViewSrc=header.concat("</tbody></body></html>");
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

   
}



class Room {
    constructor(public name: string,public time1:string,public time2:string,public time3:string,public time4:string,public time5:string) { }
}
