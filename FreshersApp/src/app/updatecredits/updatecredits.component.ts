import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "Updatecredits",
    moduleId: module.id,
    templateUrl: "./updatecredits.component.html"
})
export class UpdatecreditsComponent implements OnInit {
    
    public email;
    public amount:number;
    public path;
    public credits;
    public current;

    constructor(private router: RouterExtensions,private route: ActivatedRoute) {
        // Use the component constructor to inject providers.

        this.route.queryParams.subscribe(params => {
            this.email = params["email"];
            this.credits = params["credits"];
        });
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onAddTap(): void {

        this.amount=(+this.credits)+(+this.amount);

        firebase.query(result => {
            console.log("query result:", JSON.stringify(result));
            this.path='/User/'+result.key;
            firebase.getCurrentUser()
            .then(
                function(user) {
                    console.log(user);
                    if (user.email=="cafesecret@uom.com")
                    {
                        firebase.update(
                            this.path,
                            {
                                'CafeSecretCredits':this.amount
                            }
                        );
                    }
                    else if (user.email=="cafemain@uom.com")
                    {
                        firebase.update(
                            this.path,
                            {
                                'CafeMainCredits':this.amount
                            }
                        );
                    }
                    this.router.navigate(['/cafeadmin'], { clearHistory: true });
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
        })
    }

    onBackTap(): void {
        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }
}
