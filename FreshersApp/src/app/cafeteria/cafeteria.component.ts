import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array"
import { ChangeDetectionStrategy } from "@angular/core";
import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router";
var frames =require("ui/frame");

@Component({
    selector: "Cafeteria",
    moduleId: module.id,
    templateUrl: "./cafeteria.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CafeteriaComponent implements OnInit {

	public cafe: Array<Cafe>;

    constructor(private router: RouterExtensions) {
         this.cafe= [];

        for (let i = 0; i < uom_cafe.length; i++) {
            this.cafe.push(new Cafe(uom_cafe[i]));
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
                "Cafe_Name": uom_cafe[args.index]
            }
        };
        this.router.navigate(['/menu'], navigationExtras);
        
      }


  
}


let uom_cafe = ["Main Cafeteria","Secret Cafeteria","MIE"];


class Cafe {
    constructor(public name: string) { }
}




