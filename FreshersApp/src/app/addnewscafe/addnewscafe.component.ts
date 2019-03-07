import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import { DatePipe } from '@angular/common';
const httpModule = require("http");

@Component({
    selector: "Addnewscafe",
    moduleId: module.id,
    templateUrl: "./addnewscafe.component.html"
})
export class AddnewscafeComponent implements OnInit {
    
    public title;
    public description;
    public author;
    public date;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getCurrentUser()
        .then(
            function(user) {
                console.log(user);
                if (user.email=="cafesecret@uom.com")
                {
                    this.author="Secret Cafetaria";
                }
                else if (user.email=="cafemain@uom.com")
                {
                    this.author="Main Cafetaria";
                }
            }.bind(this)
        )
    }

    onAddButtonTap(): void {
        this.date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        firebase.push(
            '/News',
            {
              'Title': this.title,
              'Description': this.description,
              'Author': this.author,
              'Date': this.date,
              'Timestamp' : Date.now(),
              'Image':"~/app/images/cafenews.jpg"
            }
        ).then(
            function (result) {
              console.log("created key: " + result.key);
            }
        );

        httpModule.request({
            url: "https://fcm.googleapis.com/fcm/send",
            method: "POST",
            headers: {'Authorization': 'key=AAAACn6RBCk:APA91bF1vgYQbPk4P-AGNGewCBjIQc10wlYI5sz9y_kyYdBgbB2ScpxExjbaKvdeEHU6QkiXSZlYYkYBLRdkdueO6OCEM4C9nJS5pDA0PRn1REJPIGMKnvmLlYWRofkwzvSh2nNvNnz6', 'Content-Type': 'application/json' },
            content: JSON.stringify({
                "notification" : {
                    "body": this.description,
                    "title": this.title,
                    "sound": "default",
                    "priority": "High",
                    "time_to_live": "0", 

                },
                'to': "/topics/news" // its is mandatory to have /topics/ before the topic name
            })
        }).then(function(response) {
            //const result = response.content.toJSON();
            console.log(JSON.stringify(response));
        }, function (e) {
              console.log("Error occurred " + JSON.stringify(e));
        }).then(
            function (result) {
                console.log("created key: " + result.key);
            }
        );

        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }

    onBackTap(): void {
        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }
}
