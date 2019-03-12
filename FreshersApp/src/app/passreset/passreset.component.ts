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

        if (!this.email) {
          dialogs.alert({
              title: "Error!",
              message: "Please provide an email.",
              okButtonText: "OK, got it"
            });
      }
      else {

        firebase.query(result => {
          if (result.value==null)
          {
            dialogs.alert({
              title: "Error!",
              message: "No account found related to this email.",
              okButtonText: "OK, got it"
            });
          }
          else {
            firebase.resetPassword({
              email: this.email
            }).then(
                function () {
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
        },"/User",
          {
              singleEvent: true,
              orderBy: {
                  type: firebase.QueryOrderByType.CHILD,
                  value: 'Email' 
              },
              ranges: [
              {
                  type: firebase.QueryRangeType.START_AT,
                  value: this.email
              },
              {
                  type: firebase.QueryRangeType.END_AT,
                  value: this.email
              }
              ],
              limit: {
                  type: firebase.QueryLimitType.LAST,
                  value: 1
              }
          }
      );

    }
}

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}

