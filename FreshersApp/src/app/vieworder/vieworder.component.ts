import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var firebase = require('nativescript-plugin-firebase');
import { RouterExtensions} from "nativescript-angular/router";
import { NavigationExtras} from "@angular/router";

@Component({
    selector: "Vieworder",
    moduleId: module.id,
    templateUrl: "./vieworder.component.html"
})
export class VieworderComponent implements OnInit {

    public orders:any;
    public keys : any;
    


    constructor(private router: RouterExtensions) {
     
    }

    ngOnInit(): void {
        // Init your component properties here.

        firebase.getValue('/Orders/Secret Cafetaria')
        .then(result=> (this.orders=this.getData(result)))
        .catch(error => console.error("Error: " + error));
    }

    

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getData(data : any): any{
    console.log(data);
        this.keys=Object.keys(data.value); 

        var counter : number;
        var orderArray = [];

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];
            var description=data.value[key].Description;

            var order = {
               description:description
                
            };
            console.log(order.description)
            orderArray.push(order);
        } 

        return orderArray;
    }
}
