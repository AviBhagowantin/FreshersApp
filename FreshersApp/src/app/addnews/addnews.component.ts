import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var firebase = require("nativescript-plugin-firebase");
import { DatePipe } from '@angular/common';

@Component({
    selector: "Addnews",
    moduleId: module.id,
    templateUrl: "./addnews.component.html"
})
export class AddnewsComponent implements OnInit {
    
    public title;
    public description;
    public author;
    public date;

    constructor(private router: RouterExtensions,private datePipe: DatePipe) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
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
            }
        ).then(
            function (result) {
              console.log("created key: " + result.key);
            }
        );
        this.router.navigate(["/admin"], { clearHistory: true });
    }

    onBackTap(): void {
        this.router.navigate(["/admin"], { clearHistory: true });
    }
}
