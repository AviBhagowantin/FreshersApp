import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router"

@Component({
    selector: "Timetable",
    moduleId: module.id,
    templateUrl: "./timetable.component.html"
})
export class TimetableComponent implements OnInit {

    public class: Array<Class>;

    constructor(private router: RouterExtensions) {
        this.class = [];

        for (let i = 0; i < classes.length; i++) {
            this.class.push(new Class(classes[i]));
        }
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onItemTap(args) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "Day": args.index+1,
                
            }
        };
        this.router.navigate(['/timetabletime'], navigationExtras);
        
      }
}

let classes=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

class Class {
    constructor(public name: string) { }
}