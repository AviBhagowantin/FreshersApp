import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Passreset",
    moduleId: module.id,
    templateUrl: "./passreset.component.html"
})
export class PassresetComponent implements OnInit {
    public email: string;
   
    constructor(private router: RouterExtensions) {
    }

    ngOnInit(): void {

    }

    onResetPasswordButtonTap(): void {

        console.log(this.email);

        firebase.resetPassword({
            email: this.email
          }).then(
              function () {
                // dialogs.alert({
                //     title: "Password Reset",
                //     message: "Please check your email(spam as well): " + this.email,
                //     okButtonText: "Nice!"
                //   });
                  this.router.navigate(['/login'], { clearHistory: true });
              }.bind(this),
              function (errorMessage) {
                dialogs.alert({
                  title: "Error!",
                  message: errorMessage,
                  okButtonText: "OK, got it"
                })
              }
          );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}

