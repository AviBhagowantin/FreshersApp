import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
registerElement('PDFView', () => PDFView);

import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "Rule",
    moduleId: module.id,
    templateUrl: "./rule.component.html"
})
export class RuleComponent implements OnInit {

    public path;
    public chapter:string;

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.chapter = params["Chapters"];
        });
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.storage.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: 'gs://freshersapp-7d28e.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: this.chapter
          }).then(
              function (url) {
                console.log("Remote URL: " + url);
                this.path=url;
                //console.log(this.path);
              }.bind(this),
              function (error) {
                console.log("Error: " + error);
              }
          );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
