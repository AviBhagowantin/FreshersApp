import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
import { RouterExtensions} from "nativescript-angular/router";
var appSettings = require('application-settings');

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

    addcredits(): void {
        this.router.navigate(['/addcredits'], { clearHistory: true });
    }

    addnews(): void {
        this.router.navigate(['/addnewscafe'], { clearHistory: true });
    }

    vieworder(){
        this.router.navigate(['/vieworder'], { clearHistory: true });
    }

    logout(): void {
        firebase.logout();
        appSettings.setBoolean("authenticated", false);
        this.router.navigate(['/home'], { clearHistory: true });
    }
    
}
