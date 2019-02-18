import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import {User} from '../models/user.model';

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    public curUser: User;
    public path: any;

    constructor(private router: RouterExtensions) {
        // Use the component constructor to inject providers.
        this.curUser = {
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
        // Init your component properties here.
        firebase.getCurrentUser()
            .then(
                function(user) {
                    console.log(user);
                    this.curUser.email=user.email;
                    console.log(this.curUser.email);
                    firebase.query(result => {
                        console.log("query result:", JSON.stringify(result));
                        this.path='/User/'+result.key;
                        this.curUser.sname=result.value.LastName;
                        this.curUser.course=result.value.Course;
                        this.curUser.phone=result.value.Phone;
                        this.curUser.fname=result.value.FirstName;
                        }, "/User", {
                        orderBy: {
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'Email'
                        },
                        ranges: [
                            {
                            type: firebase.QueryRangeType.START_AT,
                            value: this.curUser.email
                            },
                            {
                            type: firebase.QueryRangeType.END_AT,
                            value: this.curUser.email
                            }
                        ]
                    })
                }.bind(this)
            )
            .catch(error => console.log("Trouble in paradise: " + error));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    save(): void {
        firebase.update(
            this.path,
            {
              'FirstName': this.curUser.fname,
              'LastName': this.curUser.sname,
              'Course': this.curUser.course,
              'Phone': this.curUser.phone
            }
        );
        this.router.navigate(['/home'], { clearHistory: true });
    }

    goBack(): void {
        this.router.navigate(['/home'], { clearHistory: true });
    }
}
