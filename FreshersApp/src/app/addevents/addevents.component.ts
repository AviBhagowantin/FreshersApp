import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DatePipe } from '@angular/common';
var firebase = require('nativescript-plugin-firebase');
import { NavigationExtras} from "@angular/router";

@Component({
    selector: "Addevents",
    moduleId: module.id,
    templateUrl: "./addevents.component.html"
})
export class AddeventsComponent implements OnInit {

    public title;
    public description;
    public author;
    public date;
    public eventKey;
    public newsKey;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onNextTap(): void {
        this.date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');

        firebase.push(
            '/News',
            {
              'Title': this.title,
              'Description': this.description,
              'Author': this.author,
              'Date': this.date,
              'Timestamp' : Date.now(),
              'Image':"~/app/images/event.png"
            }
        ).then(
            function (result) {
              console.log("created key: " + result.key);
              this.newsKey = result.key;
            }.bind(this)
        );

        firebase.push(
            '/Events',
            {
              'title': this.title,
              'lat': "",
              'lng': "",
              'time': "",
              'date': "",
            }
        ).then(
            function (result) {
              console.log("created key: " + result.key);
              this.eventKey = result.key;
              let navigationExtras: NavigationExtras = {
                queryParams: {
                    "eventKey": this.eventKey,
                    "newsKey": this.newsKey
                }
              };
              this.router.navigate(["/eventdate"], navigationExtras, { clearHistory: true });
            }.bind(this)
        );
    }

    onBackTap(): void {
        this.router.navigate(["/admin"], { clearHistory: true });
    }
}
