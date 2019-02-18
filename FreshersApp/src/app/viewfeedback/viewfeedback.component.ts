import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Viewfeedback",
    moduleId: module.id,
    templateUrl: "./viewfeedback.component.html"
})
export class ViewfeedbackComponent implements OnInit {

    public feedback: any;
    public keys : any;

    constructor(private router: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getValue('/Feedback')
        .then(result=> (this.feedback=this.getData(result)))
        .catch(error => console.error("Error: " + error));
    }

    onBackTap(): void {
        this.router.navigate(["/admin"], { clearHistory: true });
    }

    getData(data : any): any{
        //console.log(data.value);

        this.keys=Object.keys(data.value); 

        var counter : number;
        var feedbackArray = [];

        //console.log(data.value[this.keys[0]]);
        //console.log(data.value[this.keys[0]].title);

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];

            var feedback_details = {
                email: data.value[key].Email,
                description: data.value[key].Description,
                date: data.value[key].Date
            };

            feedback_details.date="Date: "+feedback_details.date;
            feedback_details.email="User: "+feedback_details.email;

            feedbackArray.push(feedback_details);
        } 

        //console.log(newsArray);
        return feedbackArray;
    }
}
