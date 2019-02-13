import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

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
        this.router.navigate(['/addnews']);
    }

    onEventButtonTap(): void {

    }

    onFeedbackButtonTap(): void {

    }

    onLogoutButtonTap(): void {

    }
}
