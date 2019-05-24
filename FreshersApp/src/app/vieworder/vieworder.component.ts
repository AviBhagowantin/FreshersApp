import { Component, OnInit } from "@angular/core";
var firebase = require('nativescript-plugin-firebase');
import { RouterExtensions} from "nativescript-angular/router";

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
        var path;

        firebase.getCurrentUser()
            .then(
                function(user) {
                    console.log(user);
                    if (user.email=="cafesecret@uom.com")
                    {
                        path='/Orders/Secret Cafetaria';
                    }
                    else if (user.email=="cafemain@uom.com")
                    {
                        path='/Orders/Main Cafetaria';
                    }
                    firebase.getValue(path)
                    .then(result=> (this.orders=this.getData(result)))
                    .catch(error => console.error("Error: " + error));
                }.bind(this)
            )
            .catch(error => console.log("Trouble in paradise: " + error));
    }

    onBackTap(): void {
        this.router.navigate(["/cafeadmin"], { clearHistory: true });
    }

    getData(data : any): any{
    console.log(data);
        this.keys=Object.keys(data.value); 
        var counter : number;
        var orderArray = [];

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];
            var description=data.value[key].Description;
            var code=data.value[key].Code;
            var order = {
               key:key,
               description:description,
               code:code
                
            };
            console.log(order.description)
            orderArray.push(order);
        } 
        return orderArray;
    }

    removeOrder(index)
    {
        var path;
        firebase.getCurrentUser()
        .then(
            function(user) {
                console.log(user);
                if (user.email=="cafesecret@uom.com")
                {
                    path='/Orders/Secret Cafetaria/'+this.orders[index].key;
                    console.log(this.orders[index]);
                    this.orders = this.orders.filter(item => item.description !== this.orders[index].description);
                    firebase.remove(path);
                }
                else if (user.email=="cafemain@uom.com")
                {
                    path='/Orders/Main Cafetaria/'+this.orders[index].key;
                    console.log(this.orders[index]);
                    this.orders = this.orders.filter(item => item.description !== this.orders[index].description);
                    firebase.remove(path);
                }
                firebase.getValue(path)
                .then(result=> (this.orders=this.getData(result)))
                .catch(error => console.error("Error: " + error));
            }.bind(this)
        )
        .catch(error => console.log("Trouble in paradise: " + error));     
    }
}
