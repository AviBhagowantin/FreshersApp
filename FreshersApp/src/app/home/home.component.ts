import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { newsInfo } from './news';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public news: Array<News>;

    constructor() {
        this.news = [];

        for (let i = 0; i < news_details.length; i++) {

            this.news.push(new News(news_details[i].title,news_details[i].description));
        }
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    toggle(event) {
    if (event.object.textWrap) {
      event.object.textWrap = false;
    } else {
      event.object.textWrap = true;
    }
}

    
}
var news_details:newsInfo[]=[];
news_details[0]=new newsInfo();
news_details[0].title="Student Union";
news_details[0].description="There was a time a boy named Sharfaaq who was named tsu after the election. Yuzo PResiden. Among the facultyies we have new face like moorateeah tashil rye, adarsh ,adarsh , adarsh";

news_details[1]=new newsInfo();
news_details[1].title="Vice Chancellor should be fired ";
news_details[1].description="Vice Chancellor should be down from the university for he has been playing a lot with the memeber of the union and uom staff";



class News {
    constructor(public title: string,public description:string) { }
}

