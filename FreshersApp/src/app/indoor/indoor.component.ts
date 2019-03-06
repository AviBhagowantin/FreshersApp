import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {Observable} from 'data/observable';
import {
    BeaconRegion, Beacon, BeaconCallback,
    BeaconLocationOptions, BeaconLocationOptionsIOSAuthType, BeaconLocationOptionsAndroidAuthType
} from "nativescript-ibeacon/nativescript-ibeacon.common";
import {NativescriptIbeacon} from "nativescript-ibeacon";
import { ComponentFactoryResolver } from "@angular/core/src/render3";
import { FindValueSubscriber } from "rxjs/internal/operators/find";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";

@Component({
    selector: "Indoor",
    moduleId: module.id,
    templateUrl: "./indoor.component.html"
})
export class IndoorComponent  extends Observable implements BeaconCallback,OnInit {

    private nativescriptIbeacon: NativescriptIbeacon;

    public message: string = "Init";

    private region: BeaconRegion = null;

    public values=[];
    public count=0;
    public webViewSrc ="~/app/indoor/index.html";

    ngOnInit()
    {
       
    }
    
    constructor() {
        super();

        console.log('Hello World Model constructed');
        let options: BeaconLocationOptions = {
            iOSAuthorisationType: BeaconLocationOptionsIOSAuthType.Always,
            androidAuthorisationType: BeaconLocationOptionsAndroidAuthType.Coarse,
            androidAuthorisationDescription: "Location permission needed"
        };
        this.nativescriptIbeacon = new NativescriptIbeacon(this, options);
        this.region = new BeaconRegion("Blanc", "B9407F30-F5F8-466E-AFF9-25556B57FE6D");
    }

    start() {
        this.message = "start";
        if (!this.nativescriptIbeacon.isAuthorised()) {
            console.log("NOT Authorised");
            this.nativescriptIbeacon.requestAuthorization()
                .then(() => {
                    console.log("Authorised by the user");
                    this.nativescriptIbeacon.bind();

                }, (e) => {
                    console.log("Authorisation denied by the user");
                })
        } else {
            console.log("Already authorised");
            this.nativescriptIbeacon.bind();
        }

    }

    stop() {
        this.message = "stop";
        this.nativescriptIbeacon.stopRanging(this.region);
        this.nativescriptIbeacon.stopMonitoring(this.region);
        this.nativescriptIbeacon.unbind();
    }

    onBeaconManagerReady(): void {
        console.log("onBeaconManagerReady");
        this.nativescriptIbeacon.startRanging(this.region);
        this.nativescriptIbeacon.startMonitoring(this.region);
    }

    didRangeBeaconsInRegion(region: BeaconRegion, beacons: Beacon[]): void {
        console.log("didRangeBeaconsInRegion: " + region.identifier + " - " + beacons.length);
        this.message = "didRangeBeaconsInRegion: " + (new Date().toDateString());

        for (let beacon of beacons) {
            console.log("B: " + beacon.proximityUUID + " - " + beacon.major + " - " + beacon.minor + " - " + beacon.distance_proximity + " - " + beacon.rssi + " - " + beacon.txPower_accuracy );
            var d=Math.pow(10,((beacon.txPower_accuracy- beacon.rssi)/25));
            this.values.push(d);
            this.count++;
            if (this.count==3)
            {
                var sum=0;
                for(let i=0;i<this.values.length;i++)
                {
                    sum=sum+this.values[i];
                }
                //alert(sum/this.values.length+"\n");
                    var fs = require('file-system');

                   // fs.knownFolders.documents().getFile("app/app/indoor/distance.js").readText()
                   // .then((res) => {alert(res)});

                  fs.knownFolders.documents().getFile("app/app/indoor/distance.js").remove()
                 .then((res) => {
                   }).catch((err) => {
                        console.log(err.stack);
                   });
               

                  fs.knownFolders.documents().getFile("app/app/indoor/distance.js").writeText(("var myData=\'"+sum/this.values.length+","+sum/this.values.length+"\';"));
                 


                   
                sum=0;
                this.count=0;
            }
        }
    }

    didFailRangingBeaconsInRegion(region: BeaconRegion, errorCode: number, errorDescription: string): void {
        console.log("didFailRangingBeaconsInRegion: " + region.identifier + " - " + errorCode + " - " + errorDescription);
    }

    didEnterRegion(region: BeaconRegion) {
        console.log(region);
        console.log('Did enter Region ' + region.identifier);
    }

    didExitRegion(region: BeaconRegion) {
        console.log(region);
        console.log('Did leave Region '  + region.identifier);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

   
}
