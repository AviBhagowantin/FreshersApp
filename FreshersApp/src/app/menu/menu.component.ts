import { Component, OnInit ,AfterViewInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ElementRef, ViewChild} from "@angular/core";
import { Label } from 'ui/label';
var firebase = require('nativescript-plugin-firebase');
import { CheckBox } from 'nativescript-checkbox';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
var ZXing = require('nativescript-zxing');
import { Image } from "tns-core-modules/ui/image"; 
import {ImageSource, fromNativeSource} from "tns-core-modules/image-source";
@Component({
    selector: "Menu",
    moduleId: module.id,
    templateUrl: "./menu.component.html"
})


export class MenuComponent implements OnInit,AfterViewInit{

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
    public userEmail;
    public userKey;
    public code;

	 @ViewChild('actionbartitle') actionbartitle : ElementRef;
     

    public constructor(private route: ActivatedRoute, private page: Page,private router: RouterExtensions) {
        this.sum=0;
        this.tabSelectedIndex = 0;
        this.cart =[];
        this.count=0;
        this.order=this.cart;
    }

    ngAfterViewInit() {
        let imgbar: Image = <Image>this.page.getViewById<Image>('barcode');

        firebase.getCurrentUser()
            .then(
                function(user) {
                    this.userEmail=user.email;
                    firebase.query(result => {
                        this.userKey=result.key;
                        if (this.cafe=="Main Cafetaria")
                        {
                            // Retrive the credits of the user.
                            this.credits=result.value.CafeMainCredits;
                            firebase.query(result => {
                                // Fetch code of order from database.
                                this.code=result.value.Code;
                                // Create a barcode.
                                var zx = new ZXing();
                                var img = zx.createBarcode({encode: this.code.toString(), height: 500, width: 500, format: ZXing.QR_CODE});
                                console.log(imgbar);
                                imgbar.imageSource = <ImageSource> fromNativeSource(img);
                                }, "/Orders/Main Cafetaria", {
                                orderBy: {
                                    type: firebase.QueryOrderByType.CHILD,
                                    value: 'userEmail'
                                },
                                ranges: [
                                    {
                                    type: firebase.QueryRangeType.START_AT,
                                    value: this.userEmail
                                    },
                                    {
                                    type: firebase.QueryRangeType.END_AT,
                                    value: this.userEmail
                                    }
                                ],
                                limit: {
                                    type: firebase.QueryLimitType.LAST,
                                    value: 1
                                }
                            })
                        }
                        else if (this.cafe=="Secret Cafetaria")
                        {
                            this.credits=result.value.CafeSecretCredits;
                            firebase.query(result => {
                                console.log("code result:", JSON.stringify(result));
                        
                                this.code=result.value.Code;

                                var zx = new ZXing();
                                var img = zx.createBarcode({encode: this.code.toString(), height: 500, width: 500, format: ZXing.QR_CODE});
                                imgbar.imageSource = <ImageSource> fromNativeSource(img);
                                console.log(img);
                        
                                console.log(this.code);
                                }, "/Orders/Secret Cafetaria", {
                                orderBy: {
                                    type: firebase.QueryOrderByType.CHILD,
                                    value: 'userEmail'
                                },
                                ranges: [
                                    {
                                    type: firebase.QueryRangeType.START_AT,
                                    value: this.userEmail
                                    },
                                    {
                                    type: firebase.QueryRangeType.END_AT,
                                    value: this.userEmail
                                    }
                                ],
                                limit: {
                                    type: firebase.QueryLimitType.LAST,
                                    value: 1
                                }
                            })
                        }     
                        this.Current="Current Credits : "+ this.credits;
                        }, "/User", {
                        orderBy: {
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'Email'
                        },
                        ranges: [
                            {
                            type: firebase.QueryRangeType.START_AT,
                            value: this.userEmail
                            },
                            {
                            type: firebase.QueryRangeType.END_AT,
                            value: this.userEmail
                            }
                        ]
                    })
                }.bind(this)
            )
            .catch(error => console.log("Trouble in paradise: " + error));

     }

    ngOnInit(): any {
        const myTitle: Label = <Label>this.actionbartitle.nativeElement;
    
        // Retrieve name of the cafeteria selected by the user in the previous page.
        this.route.queryParams.subscribe(params => {
            this.cafe = params["Cafe_Name"];
        });

        myTitle.text=this.cafe;
        var path='/Cafetaria/'+this.cafe;

        // Retrieve data from firebase for specific cafeteria.
        firebase.getValue(path)
        .then(result => (this.items=this.getData(result)))
        .catch(error => console.log("Error: " + error));
    }

    // Get menu of the cafeteria and push it in an array.
    getData(data:any):any {
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

            var item_details = {
                title: key,
                price: data.value[key].Price,
                items: itemsArray
            };
            allItems.push(item_details);
        }    

        return allItems;
    }

    onBackTap(): void {
        this.router.navigate(['/cafeteria'], { clearHistory: true });
    }

    checkout()
    {
        let imgbar: Image = <Image>this.page.getViewById<Image>('barcode');
        if (this.credits<this.sum)
        {
            dialogs.alert({
                title: "Not enough credits",
                message: "Please go to the cafetaria to put more credits.",
                okButtonText: "OK, got it"
            })
        }
        else 
        {
            var description="";
            var path='/User/'+this.userKey;
            var orderPath='/Orders/'+this.cafe;
            this.credits=this.credits-this.sum;
            if (this.cafe=="Main Cafetaria")
            {
                firebase.update(
                    path,
                    {'CafeMainCredits':this.credits}
                );
            }
            else if (this.cafe=="Secret Cafetaria")
            {
                firebase.update(
                    path,
                    {'CafeSecretCredits':this.credits}
                );
            }
            for (var i=0;i<this.cart.length;i++)
            {
                description=description+this.cart[i].name+"("+this.cart[i].description+"),";
            }
            this.code=Math.floor(Math.random() * 100000) + 1; 
            firebase.push(
                orderPath,
                {
                  'Description': description,
                  'Code':this.code,
                  'userEmail':this.userEmail
                }
            ).then(
                function (result) {
                    console.log("created key: " + result.key);
                    var zx = new ZXing();
                    var img = zx.createBarcode({encode: this.code.toString(), height: 500, width: 500, format: ZXing.QR_CODE});
                    imgbar.imageSource = <ImageSource> fromNativeSource(img);
                    dialogs.alert({
                        title: "Order Successful!",
                        message: "Please go to the QR code tab and show the code at the cafetaria.",
                        okButtonText: "OK, got it"
                    })
                }.bind(this)
            );
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
        console.log("myIndex:" +myIndex);
        var string="";
        for(let i=0;i<this.items[myIndex].items.length;i++)
        {
           let checkbox: CheckBox = <CheckBox >this.page.getViewById<CheckBox>(this.items[myIndex].items[i].id);
           if(checkbox.checked)
           {
            string=string.concat(this.items[myIndex].items[i].text+",")
           }
           console.log("string"+string);
        }
        this.cart[this.count]=new Course(this.count,this.items[myIndex].title,string,this.items[myIndex].price);
        console.log("cart"+this.cart);
        this.count=this.count+1;
        console.log("count"+this.count);
        this.order=this.cart;
        console.log("order"+this.order);
        
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