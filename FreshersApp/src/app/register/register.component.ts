import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import {User} from '../models/user.model';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Register",
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
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

    onRegisterButtonTap(): void {

        console.log(this.user.email);
        console.log(this.user.password);

        firebase.createUser({
            email: this.user.email,
            password: this.user.password
          }).then(
              function (user) {
                firebase.push(
                    '/User',
                    {
                      'ID': this.user.sid,
                      'First Name': this.user.fname,
                      'Surname': this.user.sname,
                      'Course': this.user.course,
                      'Email': this.user.email,
                      'Phone': this.user.phone
                    }
                ).then(
                    function (result) {
                        console.log("created key: " + result.key);
                        dialogs.alert({
                            title: "User created",
                            message: "email: " + user.email,
                            okButtonText: "Nice!"
                        });
                    }
                );
                this.router.navigate(['/home'], { clearHistory: true });
              }.bind(this),
              function (errorMessage) {
                dialogs.alert({
                  title: "No user created",
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

