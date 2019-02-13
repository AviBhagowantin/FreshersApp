import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Beaconmap",
    moduleId: module.id,
    templateUrl: "./beaconmap.component.html"
})
export class BeaconmapComponent implements OnInit {

    public webSrc;
    public jsSrc;
      
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.storage.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: 'gs://freshersapp-7d28e.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: "index.html"
          }).then(
              function (url) {
                console.log("Remote URL: " + url);
                this.webSrc=url;
                //console.log(this.path);
              }.bind(this),
              function (error) {
                console.log("Error: " + error);
              }
          );

          firebase.storage.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: 'gs://freshersapp-7d28e.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: "mapwize.js"
          }).then(
              function (url) {
                console.log("Remote URL: " + url);
                this.jsSrc=url;
                //console.log(this.path);
              }.bind(this),
              function (error) {
                console.log("Error: " + error);
              }
          );

        console.log(this.jsSrc);
        console.log(this.webSrc);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
