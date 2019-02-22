import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ElementRef, ViewChild} from "@angular/core";
import { Label } from 'ui/label';
var firebase = require('nativescript-plugin-firebase');
import { CheckBox } from 'nativescript-checkbox';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Menu",
    moduleId: module.id,
    templateUrl: "./menu.component.html"
})


export class MenuComponent implements OnInit {

	public cafe:string;
    public tabSelectedIndex: number;
    public count:number;
    public cart:any;
    public items: any[];
    public order:any;
    public Current:string;
    public Cost:string;
    public credits:number;
    public sum:number;
    public keys : any;

	 @ViewChild('actionbartitle') actionbartitle : ElementRef;
     

    public constructor(private route: ActivatedRoute, private page: Page,private router: RouterExtensions) {
        this.sum=0;
        this.tabSelectedIndex = 0;
        this.cart =[];
        this.count=0;
        this.order=this.cart;
    }

    ngOnInit(): any {

        firebase.getCurrentUser()
            .then(
                function(user) {
                    console.log(user);
                    var userEmail=user.email;
                    firebase.query(result => {
                        console.log("query result:", JSON.stringify(result));
                        this.credits=result.value.CafeCredits;
                        this.Current="Current Credits : "+ this.credits;
                        }, "/User", {
                        orderBy: {
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'Email'
                        },
                        ranges: [
                            {
                            type: firebase.QueryRangeType.START_AT,
                            value: userEmail
                            },
                            {
                            type: firebase.QueryRangeType.END_AT,
                            value: userEmail
                            }
                        ]
                    })
                }.bind(this)
            )
            .catch(error => console.log("Trouble in paradise: " + error));

    	const myTitle: Label = <Label>this.actionbartitle.nativeElement;
        this.route.queryParams.subscribe(params => {
            this.cafe = params["Cafe_Name"];
  			
        });

        myTitle.text=this.cafe;
    
        var path='/Cafetaria/'+this.cafe;

        firebase.getValue(path)
        .then(result => (this.items=this.getData(result)))
        .catch(error => console.log("Error: " + error));
  
    }

    getData(data:any):any {
        console.log(data);

        var allItems=[];

        this.keys=Object.keys(data.value); 
        var counter : number;

        for (counter = 0; counter < this.keys.length; counter++) {

            var key = this.keys[counter];

            var itemsArray=[];

            var items=data.value[key].items;

            for (var z=1;z<items.length;z++) {
                var x={
                    id:z,
                    text:items[z]
                }

                itemsArray.push(x);
            }

            console.log("Items:"+items);

            var item_details = {
                title: key,
                price: data.value[key].Price,
                items: itemsArray
            };

            console.log(item_details);

            allItems.push(item_details);
        }
        
        return allItems;
    }

    onBackTap(): void {
        this.router.navigate(['/cafeteria'], { clearHistory: true });
    }

    checkout()
    {
        if (this.credits<this.sum)
        {
            dialogs.alert({
                title: "Not enough credits",
                message: "Please go to the cafetaria to put more credits.",
                okButtonText: "OK, got it"
              })
        }
    }

    loadMore()
    {
        this.order=this.cart;
    }

    remove(indexes)
    {
            this.cart = this.cart.filter(item => item.id !== this.cart[indexes].id);
            this.order=this.cart;
            this.count=this.count-1;
           if(this.cart.length==0)
           {
                this.cart=[];
                this.count=0;
           }
           
           this.sum=0;
        for(let i=0;i<this.cart.length;i++)
        {
            this.sum=this.sum+parseFloat(this.cart[i].price);
        }
        this.Cost="Order Cost : "+this.sum.toString();
    }

    addmenutocart(args,myIndex)
    {
        var string="";
        for(let i=0;i<this.items[myIndex].items.length;i++)
        {
           let checkbox: CheckBox = <CheckBox >this.page.getViewById<CheckBox>(this.items[myIndex].items[i].id);
           if(checkbox.checked)
           {
            string=string.concat(this.items[myIndex].items[i].text+",")
           }
        }
        this.cart[this.count]=new Course(this.count,this.items[myIndex].title,string,this.items[myIndex].price);
        this.count=this.count+1;
        this.order=this.cart;
        
        this.sum=0;
        for(let i=0;i<this.cart.length;i++)
        {
            this.sum=this.sum+parseFloat(this.cart[i].price);
        }
        this.Cost="Order Cost : "+this.sum.toString();
        
    }

   

}

class Course{
    constructor(public id:number,public name:string,public description:string,public price:string) { }
}