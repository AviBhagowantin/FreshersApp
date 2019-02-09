import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import firebase = require("nativescript-plugin-firebase"); 
import { DatePipe } from '@angular/common';
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Feedback",
    moduleId: module.id,
    templateUrl: "./feedback.component.html"
})
export class FeedbackComponent implements OnInit {
    public feedtext: any;
    public email: string;

    constructor(private datePipe: DatePipe,private router: RouterExtensions) {
        this.feedtext="";
    }

    ngOnInit(): void {
        firebase.getCurrentUser()
        .then(user => this.email=user.email)
        .catch(error => console.log("Trouble in paradise: " + error));
    }

    onSubmitButtonTap(): void {
        if (this.feedtext=="") {
            dialogs.alert({
                title: "Empty Field",
                message: "No data has been entered.",
                okButtonText: "OK, got it"
              })
        } else {
            var d = new Date();
            var date=String(this.datePipe.transform(d,"dd-MM-yyyy"));
            console.log(this.email);
            console.log(this.feedtext);
            console.log(date);
            firebase.push(
                '/Feedback',
                {
                  'Email': this.email,
                  'Description': this.feedtext,
                  'Date': date
                }
            ).then(
                function (result) {
                  console.log("created key: " + result.key);
                  this.router.navigate(['/home'], { clearHistory: true });
                }.bind(this)
            );
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
