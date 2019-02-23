import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router";

@Component({
    selector: "Cafeadmin",
    moduleId: module.id,
    templateUrl: "./cafeadmin.component.html"
})
export class CafeadminComponent implements OnInit {

    public rules:any;
    public keys : any;
    


    constructor(private router: RouterExtensions) {
     
    }

    ngOnInit(): void {
        // Init your component properties here.

     
    }

    vieworder(){
        this.router.navigate(['/vieworder']);
        
      }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    
}
