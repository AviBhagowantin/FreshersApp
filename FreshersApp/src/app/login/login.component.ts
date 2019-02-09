import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
var firebase = require("nativescript-plugin-firebase");
import {User} from '../models/user.model';
import * as dialogs from "tns-core-modules/ui/dialogs";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    public user: User;

   
    constructor(private router: RouterExtensions) {
        this.user = {
            "email":"",
            "password":"",
            "sid":"",
            "sname":"",
            "fname":"",
            "course":"",
            "phone":""
        }
    }

    ngOnInit(): void {

    }

    onSigninButtonTap(): void {

        firebase.login(
            {
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                  email: this.user.email,
                  password: this.user.password
                }
            })
            .then(
                function () {
                    ApplicationSettings.setBoolean("authenticated", true);
                    this.router.navigate(['/home'], { clearHistory: true });
                }.bind(this),
                function (errorMessage) {
                  dialogs.alert({
                    title: "Login Unsuccessful",
                    message: errorMessage,
                    okButtonText: "OK, got it"
                  });
                }
            );
            //.then(result => console.log(JSON.stringify(result)))
            //.catch(error => console.log(error));


        
    }

    onRegisterTap(): void {
        this.router.navigate(['/register'], { clearHistory: true });
    }

    onForgotPasswordTap(): void {
        this.router.navigate(['/passreset'], { clearHistory: true });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}

