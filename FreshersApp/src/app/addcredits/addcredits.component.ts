import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import { DatePipe } from '@angular/common';
const httpModule = require("http");
import { NavigationExtras} from "@angular/router";


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

        firebase.query(result => {
            console.log("query result:", JSON.stringify(result));
            firebase.getCurrentUser()
            .then(
                function(user) {
                    console.log(user);
                    if (user.email=="cafesecret@uom.com")
                    {
                        this.credits=result.value.CafeSecretCredits;
                        console.log(result.value.CafeSecretCredits);
                    }
                    else if (user.email=="cafemain@uom.com")
                    {
                        this.credits=result.value.CafeMainCredits;
                    }
                    console.log(this.credits);

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
            }, "/User", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'Email'
            },
            ranges: [
                {
                type: firebase.QueryRangeType.START_AT,
                value: this.email.toLowerCase()
                },
                {
                type: firebase.QueryRangeType.END_AT,
                value: this.email.toLowerCase()
                }
            ],
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: 1
            }
        })
    }

    onBackTap(): void {
        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }
}
