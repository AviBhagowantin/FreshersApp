import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router";

@Component({
    selector: "Ruletitle",
    moduleId: module.id,
    templateUrl: "./ruletitle.component.html"
})
export class RuletitleComponent implements OnInit {

    public rules:any;
    public keys : any;
    


    constructor(private router: RouterExtensions) {
     
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getValue('/Rules')
        .then(result=> (this.rules=this.getData(result)))
        .catch(error => console.error("Error: " + error));
    }

    public onItemTap(args) {

        console.log(args.index);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "Chapters": this.rules[args.index].path
            }
        };
        this.router.navigate(['/rule'], navigationExtras);
        
      }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getData(data : any): any{

        this.keys=Object.keys(data.value); 

        var counter : number;
        var ruleArray = [];

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];
            var path=data.value[key].Path;
            var title=data.value[key].Title;

            var rule = {
                title: title,
                path: path
            };

            ruleArray.push(rule);
        } 

        return ruleArray;
    }
}
