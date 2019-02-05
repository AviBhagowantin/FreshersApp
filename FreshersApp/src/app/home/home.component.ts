import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public news: any;
    public keys : any;

    constructor() {

    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getValue('/News')
        .then(result=> (this.news=this.getData(result)))
        .catch(error => console.error("Error: " + error));

        //console.log(this.news);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    // toggle(event) {
    //     if (event.object.textWrap) {
    //     event.object.textWrap = false;
    //     } else {
    //     event.object.textWrap = true;
    //     }
    // }

    getData(data : any): any{
        //console.log(data.value);

        this.keys=Object.keys(data.value); 

        var counter : number;
        var newsArray = [];

        //console.log(data.value[this.keys[0]]);
        //console.log(data.value[this.keys[0]].title);

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];

            var news_details = {
                title: data.value[key].Title,
                description: data.value[key].Description,
                date: data.value[key].Date,
                author: data.value[key].Author
            };

            news_details.date="Date: "+news_details.date;
            news_details.author="Author: "+news_details.author;

            newsArray.push(news_details);
        } 

        //console.log(newsArray);
        return newsArray;
    }

    
}

class News {
    constructor(public title: string,public description:string) { }
}

