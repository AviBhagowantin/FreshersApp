import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { DatePipe } from '@angular/common';
var dialogs = require("tns-core-modules/ui/dialogs");
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public news: any;
    public keys : any;

    constructor(private datePipe: DatePipe) {

    }

    ngOnInit(): void {

        this.news=this.getData();
        console.log(this.news);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(i)
    {
        
        dialogs.alert({
            title: this.news[i].title,
            message: this.news[i].description,
            okButtonText: "ok"
        }).then(function () {
            console.log("Dialog closed!");
        });

    }
    // toggle(event) {
    //     if (event.object.textWrap) {
    //     event.object.textWrap = false;
    //     } else {
    //     event.object.textWrap = true;
    //     }
    // }

    getData(): any{
        var nowDate = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        var nowYear = +(nowDate[6]+nowDate[7]+nowDate[8]+nowDate[9]);
        var nowMonth = +(nowDate[3]+nowDate[4]);

        var newsArray = [];

        firebase.query(result => {

            var news_details = {
                title: result.value.Title,
                description: result.value.Description,
                date: result.value.Date,
                author: result.value.Author
            };

            var year = +(news_details.date[6]+news_details.date[7]+news_details.date[8]+news_details.date[9]);
            var month = +(news_details.date[3]+news_details.date[4]);

            news_details.date="Date: "+news_details.date;
            news_details.author="Author: "+news_details.author;
            

            if ((year<nowYear) && (nowMonth==1) && (month==12))
            {
                newsArray.unshift(news_details);
            }
            else if ((year==nowYear) && ((nowMonth-month==1) || (nowMonth==month)))
            {
                newsArray.unshift(news_details);
            }

            }, "/News", {
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'Timestamp'
            }
        });

        return newsArray;
    }

        // toggle(event) {
    //     if (event.object.textWrap) {
    //     event.object.textWrap = false;
    //     } else {
    //     event.object.textWrap = true;
    //     }
    // }
}
