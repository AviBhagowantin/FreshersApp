import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import { DatePipe } from '@angular/common';
const httpModule = require("http");

@Component({
    selector: "Updatecredits",
    moduleId: module.id,
    templateUrl: "./updatecredits.component.html"
})
export class UpdatecreditsComponent implements OnInit {
    
    public email;
    public amount;
    public path;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onAddTap(): void {
        firebase.query(result => {
            console.log("query result:", JSON.stringify(result));
            this.path='/User/'+result.key;
            firebase.getCurrentUser()
            .then(
                function(user) {
                    console.log(user);
                    if (user.email=="cafesecret@uom.com")
                    {
                        firebase.getValue(this.path)
                        .then(result => (this.amount=this.amount+result.value.CafeSecretCredits))
                        .catch(error => console.log("Error: " + error));
                        firebase.update(
                            this.path,
                            {
                                'CafeSecretCredits':this.amount
                            }
                        );
                    }
                    else if (user.email=="cafemain@uom.com")
                    {
                        firebase.getValue(this.path)
                        .then(result => (this.amount=this.amount+result.value.CafeMainCredits))
                        .catch(error => console.log("Error: " + error));
                        firebase.update(
                            this.path,
                            {
                                'CafeMainCredits':this.amount
                            }
                        );
                    }
                }.bind(this)
            )
            .catch(error => console.log("Trouble in paradise: " + error));
            this.router.navigate(['/home'], { clearHistory: true });
            }, "/User", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'Email'
            },
            ranges: [
                {
                type: firebase.QueryRangeType.START_AT,
                value: this.email.toLowerCase( )
                },
                {
                type: firebase.QueryRangeType.END_AT,
                value: this.email.toLowerCase( )
                }
            ]
        })
    }

    onBackTap(): void {
        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }
}
