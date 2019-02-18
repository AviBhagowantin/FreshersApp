import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {ActivatedRoute} from "@angular/router";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array"
import {ElementRef, ViewChild} from "@angular/core";
import { StackLayout } from 'ui/layouts/stack-layout';
import { Label } from 'ui/label';
import { menuItem } from './menuItem';
import {EventData} from "data/observable"



@Component({
    selector: "Menu",
    moduleId: module.id,
    templateUrl: "./menu.component.html"
})


export class MenuComponent implements OnInit {

	public cafe:string;
    public tabSelectedIndex: number;
    public cafes: Array<Course>;
    public cafes2: Array<Course>;

    
    public sum:number;

	 @ViewChild('actionbartitle') actionbartitle : ElementRef;


    public constructor(private route: ActivatedRoute) {
        this.sum=0;
        this.tabSelectedIndex = 0;
        this.cafes = [];
        this.cafes2 = [];

        for (let i = 0; i < menu_Item.length; i++) {
            this.cafes.push(new Course(menu_Item[i].name,menu_Item[i].description,menu_Item[i].price));
        }

        for (let i = 0; i < drink_Item.length; i++) {
            this.cafes2.push(new Course(drink_Item[i].name,drink_Item[i].description,drink_Item[i].price));
        }
    }

    ngOnInit(): any {

    	const myTitle: Label = <Label>this.actionbartitle.nativeElement;


        this.route.queryParams.subscribe(params => {
            this.cafe = params["Cafe_Name"];
  			
        });

    	myTitle.text=this.cafe;


    }

    adddrinktocart(args: EventData, index: number)
    {
        alert("Add to cart");
        drink_cart.push(index);
    }
    
    addmenutocart(args: EventData, index: number)
    {
        alert("Added to cart");
        menu_cart.push(index);
    }

    calculateprice()
    {
        this.sum=0;
        for (let i = 0; i < drink_cart.length; i++) {
            this.sum=this.sum+drink_Item[drink_cart[i]].price;
        }

        for (let i = 0; i < menu_cart.length; i++) {
            this.sum=this.sum+menu_Item[menu_cart[i]].price;
        }

        alert(this.sum);
    }

}

let drink_cart:number[]=[];
let menu_cart:number[]=[];
var menu_Item:menuItem[]=[];
menu_Item[0]=new menuItem();
menu_Item[0].name="Pomme de terre Crazer";
menu_Item[0].description="Bien saller avec un pince du sel";
menu_Item[0].price=20.50;

menu_Item[1]=new menuItem();
menu_Item[1].name="Pomme dammour Crazer";
menu_Item[1].description="Bien doux avec un pince du sel";
menu_Item[1].price=250.50;

var drink_Item:menuItem[]=[];
drink_Item[0]=new menuItem();
drink_Item[0].name="Water 1L";
drink_Item[0].description="";
drink_Item[0].price=200;

drink_Item[1]=new menuItem();
drink_Item[1].name="Coca";
drink_Item[1].description="";
drink_Item[1].price=2;

class Course{
    constructor(public name: string,public description:string,public price:number) { }
}