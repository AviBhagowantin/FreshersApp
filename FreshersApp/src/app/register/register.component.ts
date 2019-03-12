import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import {User} from '../models/user.model';
import * as dialogs from "tns-core-modules/ui/dialogs";

var regexpemail = new RegExp('^[a-zA-Z0-9]+\.{1}[a-zA-Z0-9]+@umail.uom.ac.mu$');
var regexpsid = new RegExp('^[0-9]{7}$');
var regexpphone = new RegExp('^5+[0-9]{7}$');


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

        if (!this.user.email || !this.user.password || !this.user.sid || !this.user.fname || !this.user.sname || !this.user.course || !this.user.phone) {
            dialogs.alert({
                title: "Registration Unsuccessfull!",
                message: "Please fill in all the fields.",
                okButtonText: "OK, got it"
              });
        }
        else {
            var testemail = regexpemail.test(this.user.email);
            var testphone = regexpphone.test(this.user.phone);
            var testsid = regexpsid.test(this.user.sid);

            if (testemail==false) {
                dialogs.alert({
                    title: "Invalid Email!",
                    message: "Please use your UoM email to register.",
                    okButtonText: "OK, got it"
                  });
            }
            else if (testphone==false) {
                dialogs.alert({
                    title: "Invalid Phone Number!",
                    message: "Please input a valid phone number.",
                    okButtonText: "OK, got it"
                  });
            }
            else if (testsid==false) {
                dialogs.alert({
                    title: "Invalid Student ID!",
                    message: "Please use your UoM Student ID.",
                    okButtonText: "OK, got it"
                  });
            }
            else if (this.user.password.length<6) {
                dialogs.alert({
                    title: "Invalid Password!",
                    message: "Your password must be at least 6 characters.",
                    okButtonText: "OK, got it"
                  });
            }
            else {
                firebase.query(result => {
                    if (result.value==null)
                    {
                        firebase.createUser({
                            email: this.user.email,
                            password: this.user.password
                          }).then(
                              function (user) {
                                firebase.push(
                                    '/User',
                                    {
                                      'ID': this.user.sid,
                                      'FirstName': this.user.fname,
                                      'LastName': this.user.sname,
                                      'Course': this.user.course,
                                      'Email': this.user.email.toLowerCase( ),
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
                    else {
                        dialogs.alert({
                            title: "Error!",
                            message: "This email already exists.",
                            okButtonText: "OK, got it"
                          });
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
                            value: this.user.email
                        },
                        {
                            type: firebase.QueryRangeType.END_AT,
                            value: this.user.email
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
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}

