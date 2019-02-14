import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
var appSettings = require('application-settings');
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Admin",
    moduleId: module.id,
    templateUrl: "./admin.component.html"
})
export class AdminComponent implements OnInit {

    constructor(private router: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onNewsButtonTap(): void {
        this.router.navigate(['/addnews'], { clearHistory: true });
    }

    onEventButtonTap(): void {

    }

    onFeedbackButtonTap(): void {
        this.router.navigate(['/viewfeedback'], { clearHistory: true });
    }

    onLogoutButtonTap(): void {
        firebase.logout();
        appSettings.setBoolean("authenticated", false);
        this.router.navigate(['/home'], { clearHistory: true });
    }
}
