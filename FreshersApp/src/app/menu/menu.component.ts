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

import { CheckBox } from 'nativescript-checkbox';
import { Page } from 'tns-core-modules/ui/page';

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
    public credits:string;
    public sum:number;

	 @ViewChild('actionbartitle') actionbartitle : ElementRef;
     

    public constructor(private route: ActivatedRoute, private page: Page) {
        this.sum=0;
        this.tabSelectedIndex = 0;
        this.cart =[];
        this.count=0;
        this.credits="100";
        this.order=this.cart;
    }

    ngOnInit(): any {

    	const myTitle: Label = <Label>this.actionbartitle.nativeElement;
        this.Current="Current Credits : "+ this.credits;



        this.route.queryParams.subscribe(params => {
            this.cafe = params["Cafe_Name"];
  			
        });

    	myTitle.text=this.cafe;
        

        this.items = [
            {
                title: 'Mine Frite',
                headerText: 'Poulet',
                price: '50',
                items: [{ id:"Soy",text: 'Soy Sauce'}, {id:"Margoz",
                    text: 'Margoz'}]
            },
            {
                title: 'Roti Faratha',
                headerText: 'Poulet',
                price: '50',
                items: [{ id:"Rougaille" ,text: 'Rougaille'},{ id:"Gros Pois" ,text: 'Gros Pois'},{ id:"Sardine" ,text: 'Sardine'}, {
                    id:"Poule",text: 'Poule'}]
            }];

  
    }

    calculateprice()
    {
        
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