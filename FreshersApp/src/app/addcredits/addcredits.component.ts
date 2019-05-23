import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import { DatePipe } from '@angular/common';
import { NavigationExtras} from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";



@Component({
    selector: "Addcredits",
    moduleId: module.id,
    templateUrl: "./addcredits.component.html"
})
export class AddcreditsComponent implements OnInit {
    
    public email;
    public credits;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onNextTap(): void {

        if (!this.email) {
            dialogs.alert({
                title: "Error!",
                message: "Please input an email.",
                okButtonText: "OK, got it"
              });
        }
        else {
            firebase.query(result => {
                console.log("query result:", JSON.stringify(result));
                console.log(result.value);
                if (result.value==null) {
                    dialogs.alert({
                        title: "Error!",
                        message: "Email does not exist.",
                        okButtonText: "OK, got it"
                      });
                }
                else {
                    firebase.getCurrentUser()
                    .then(
                        function(user) {
                            //console.log(result.value);
                            //console.log("query result:", JSON.stringify(result.key));

                            if (user.email=="cafesecret@uom.com")
                            {
                            
                                this.credits=result.value.CafeSecretCredits;
                                console.log(result.value.CafeSecretCredits);
                            }
                            else if (user.email=="cafemain@uom.com")
                            {
                                this.credits=result.value.CafeMainCredits;
                                console.log("TEST"+result.value.CafeMainCredits);
                            }
                            console.log("Credits at cafe"+this.credits);
        
                            let navigationExtras: NavigationExtras = {
                                queryParams: {
                                    "email": this.email.toLowerCase(),
                                    "credits":this.credits
                                }
                              };
                    
                            this.router.navigate(["/updatecredits"],navigationExtras);
                        }.bind(this)
                    )
                    .catch(error => console.log("Trouble in paradise: " + error));
                }
                }, "/User", {
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
                        ]
                    })
        }
    }

    onBackTap(): void {
        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }
}
