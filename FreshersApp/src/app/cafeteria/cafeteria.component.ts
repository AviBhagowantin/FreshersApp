import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router";
var firebase = require('nativescript-plugin-firebase');

@Component({
    selector: "Cafeteria",
    moduleId: module.id,
    templateUrl: "./cafeteria.component.html"
})
export class CafeteriaComponent implements OnInit {

    public cafe: Array<Cafe>;
    public uom_cafe=[];

    constructor(private router: RouterExtensions) {
    }

    ngOnInit(): void {
        firebase.getValue('/Cafetaria')
        .then(result => this.getData(result))
        .catch(error => console.log("Error: " + error));
    }

    getData(data:any):any {
        this.uom_cafe=Object.keys(data.value); 
        this.cafe= [];
        for (let i = 0; i < this.uom_cafe.length; i++) {
            this.cafe.push(new Cafe(this.uom_cafe[i]));
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onItemTap(args) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "Cafe_Name": this.uom_cafe[args.index]
            }
        };
        this.router.navigate(['/menu'], navigationExtras);
        
      }
}

class Cafe {
    constructor(public name: string) { }
}




