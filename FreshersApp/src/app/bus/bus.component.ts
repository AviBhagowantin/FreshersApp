import { Component, OnInit, NgZone } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
import { DatePipe } from '@angular/common';
    

@Component({
    selector: "Bus",
    moduleId: module.id,
    templateUrl: "./bus.component.html"
})
export class BusComponent implements OnInit {

    public buses : any;
    public keys : any;

    constructor(private datePipe: DatePipe) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getValue('/Buses')
            .then(result=> (this.buses=this.getData(result)))
            .catch(error => console.error("Error: " + error));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getData(data : any): any{

        this.keys=Object.keys(data.value); 

        var counter : number;
        var busArray = [];

        for (counter = 0; counter < this.keys.length; counter++) {

            var nb;
            var key = this.keys[counter];
            var route=data.value[key].route;
            var dest=data.value[key].destination;
            var freq=data.value[key].frequency;
            var lb=data.value[key].lastBus;
            var fb=data.value[key].firstBus;
            var time=this.datePipe.transform(Date.now(), 'HH:mm');
            var f=+(freq[0]+freq[1]);
            var fbh=+(fb[0]+fb[1]);
            var fbm=+(fb[3]+fb[4]);
            var lbh=+(lb[0]+lb[1]);
            var lbm=+(lb[3]+lb[4]);
            var th=+(time[0]+time[1]);
            var tm=+(time[3]+time[4]);

            if (((th<fbh) && (th<7)) || (th>lbh) || ((th==lbh) && (tm>lbm)))
            {
                nb="None";
            }
            else 
            {
                if (th==lbh)
                {
                    if (tm==lbm) 
                    {
                        nb="0 mins";
                    }
                    else
                    {
                        nb=lbm-tm;
                        nb=nb+" mins";
                    }
                }
                else 
                {
                    while (th>fbh) {
    
                        fbm=fbm+f;
                        if (fbm>=60)
                        {
                            fbh=fbh+1;
                            fbm=fbm-60;
                        }
        
                    }
        
                    if (th==fbh) {
                        
                        while (tm>fbm) {
                            fbm=fbm+f;
        
                            if (fbm>=60)
                            {
                                fbh=fbh+1;
                                fbm=fbm-60;
                                break;
                            }
                        }
        
                        if ((fbm>=tm) && (th==fbh))
                        {
                            nb=fbm-tm;
                            nb=nb+" mins";
                        }
                    }
        
                    if (fbh>th) 
                    {
                        if ((fbh==lbh) && (fbm>=lbm) )
                        {
                            lbm=lbm+60;
                            nb=lbm-tm;
                            nb=nb+" mins";
                        }
                        else
                        {
                            fbm=fbm+60;
                            nb=fbm-tm;
                            nb=nb +" mins";
                        }
                    }
                }
            }

            var bus = {
                route: route,
                destination: dest,
                frequency: freq,
                lastBus: lb,
                firstBus: fb,
                nextBus: nb
            };

            busArray.push(bus);
        } 

        return busArray;
    }
}
