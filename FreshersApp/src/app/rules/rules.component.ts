import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import config from "./rules.json";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array"
import { ChangeDetectionStrategy } from "@angular/core";
import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router";
var frames =require("ui/frame");

@Component({
    selector: "Rules",
    moduleId: module.id,
    templateUrl: "./rules.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulesComponent implements OnInit {

	public rule: Array<Rule>;

    constructor(private router: RouterExtensions) {
         this.rule = [];

        for (let i = 0; i < rules_title.length; i++) {
            this.rule.push(new Rule(rules_title[i]));
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
                "Chapters": args.index+1
            }
        };
        this.router.navigate(['/ruledetails'], navigationExtras);
        
      }


  
}

let array = new ObservableArray(config.rules);
let rules_title = [];

for (let i = 0; i < array.length; i++) {
            rules_title.push(array.getItem(i).title);
        }


class Rule {
    constructor(public name: string) { }
}




