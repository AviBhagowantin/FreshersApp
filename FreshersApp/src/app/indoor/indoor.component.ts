import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {Observable} from 'data/observable';
import {
    BeaconRegion, Beacon, BeaconCallback,
    BeaconLocationOptions, BeaconLocationOptionsIOSAuthType, BeaconLocationOptionsAndroidAuthType
} from "nativescript-ibeacon/nativescript-ibeacon.common";
import {NativescriptIbeacon} from "nativescript-ibeacon";

var bluetooth = require("nativescript-bluetooth");
var dialogs = require("tns-core-modules/ui/dialogs");

@Component({
    selector: "Indoor",
    moduleId: module.id,
    templateUrl: "./indoor.component.html"
})
export class IndoorComponent  extends Observable implements BeaconCallback,OnInit {

    private nativescriptIbeacon: NativescriptIbeacon;

    public message: string = "Init";

    private region1: BeaconRegion = null;
    private region2: BeaconRegion = null;

    public values=[];
    public count=0;
    public webViewSrc ="~/app/indoor/index.html";

    ngOnInit()
    {
        bluetooth.isBluetoothEnabled().then(function(enabled) {
            if (!enabled)
            {
                dialogs.alert({
                    title: "Bluetooth",
                    message: "Please enable your bluetooth to get your indoor location",
                    okButtonText: "Okay, thanks"
                });
            }
      });

      this.start();

      this.page.on('navigatingFrom', (data) => {
        this.stop();
      });
    }
    
    constructor(private page: Page) {
        super();

        console.log('Hello World Model constructed');
        let options: BeaconLocationOptions = {
            iOSAuthorisationType: BeaconLocationOptionsIOSAuthType.Always,
            androidAuthorisationType: BeaconLocationOptionsAndroidAuthType.Coarse,
            androidAuthorisationDescription: "Location permission needed"
        };
        this.nativescriptIbeacon = new NativescriptIbeacon(this, options);
        this.region1 = new BeaconRegion("Blanc", "B9407F30-F5F8-466E-AFF9-25556B57FE6D");
        this.region2 = new BeaconRegion("Vert","63208BDB-82E2-46E4-A066-839A1E5DC12D");
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
        this.nativescriptIbeacon.stopRanging(this.region1);
        this.nativescriptIbeacon.stopMonitoring(this.region1);
        this.nativescriptIbeacon.stopRanging(this.region2);
        this.nativescriptIbeacon.stopMonitoring(this.region2);
        this.nativescriptIbeacon.unbind();
    }

    onBeaconManagerReady(): void {
        console.log("onBeaconManagerReady");
        this.nativescriptIbeacon.startRanging(this.region1);
        this.nativescriptIbeacon.startMonitoring(this.region1);
        this.nativescriptIbeacon.startRanging(this.region2);
        this.nativescriptIbeacon.startMonitoring(this.region2);
    }

    didRangeBeaconsInRegion(region: BeaconRegion, beacons: Beacon[]): void {
        console.log("didRangeBeaconsInRegion: " + region.identifier + " - " + beacons.length);
        this.message = "didRangeBeaconsInRegion: " + (new Date().toDateString());

        for (let beacon of beacons) {
            console.log("B: " + beacon.proximityUUID + " - " + beacon.major + " - " + beacon.minor + " - " + beacon.distance_proximity + " - " + beacon.rssi + " - " + beacon.txPower_accuracy );
            var d=Math.pow(10,((beacon.txPower_accuracy- beacon.rssi)/25));
            this.values.push(d);
            this.count++;
            if (this.count==8)
            {
                var sum=0;
                for(let i=0;i<this.values.length;i++)
                {
                    sum=sum+this.values[i];
                }
                //alert(sum/this.values.length+"\n");
                    var fs = require('file-system');

                fs.knownFolders.documents().getFile("app/app/indoor/distance.js").readText()
                .then((res) => {console.log("Result :" +res)});

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
