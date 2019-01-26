import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {Page} from "ui/page";
import { EventData } from 'tns-core-modules/data/observable';
import { Label } from 'ui/label';
import { StackLayout } from 'ui/layouts/stack-layout';
import {Button} from "ui/button";
import { getViewById } from "tns-core-modules/ui/core/view";
import {ElementRef, ViewChild} from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import { fromObject } from "tns-core-modules/data/observable";
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import { Model } from './model';

@Component({
    selector: "CPA",
    moduleId: module.id,
    templateUrl: "./cpa.component.html"
})
export class CpaComponent implements OnInit {

    @ViewChild('stack') stack : ElementRef;
    @ViewChild('label') label : ElementRef;
     

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    
    addmodule(args:EventData): void {
            const myStack: StackLayout = this.stack.nativeElement;

            var observable = require("data/observable");
            var source = new observable.Observable();
            var source1 = new observable.Observable();
            var source2= new observable.Observable();

            let stack_module_year1=new StackLayout();
            
            model[counter]=new Model();
            model[counter].module_weight = new TextField();
            model[counter].module_perc_marks=new TextField();
            model[counter].module_credits=new TextField();
            
            model[counter].module_weight.hint="Module Weight";
            model[counter].module_perc_marks.hint="Enter % Marks";
            model[counter].module_credits.hint="Enter Credits";
            
            model[counter].module_weight.bind(textFieldBindingOptions, source);
            model[counter].module_perc_marks.bind(textFieldBindingOptions1, source1);
            model[counter].module_credits.bind(textFieldBindingOptions2, source2);

            stack_module_year1.addChild(model[counter].module_weight);
            stack_module_year1.addChild(model[counter].module_credits);
            stack_module_year1.addChild(model[counter].module_perc_marks);          
            
            myStack.addChild(stack_module_year1);
            counter++;
    }

    calculatecpa(args:EventData):void{
           
    
        var count;
        var credits_weightage=0;
        var marks_credits_weightage=0;
        for (count = 0; count < counter; count++) {

                var credits=parseInt(model[count].module_credits.text);
                var weightage=parseInt(model[count].module_weight.text);
                var marks=parseInt(model[count].module_perc_marks.text);

                credits_weightage=credits_weightage+(credits*weightage);
                marks_credits_weightage=marks_credits_weightage+(credits*weightage*marks);

        }
         
        var cpa=marks_credits_weightage/credits_weightage;
          const mylabel: Label= <Label>this.label.nativeElement;
         mylabel.text=cpa.toString();     
    }

}




function onLoaded(args) {
    alert("TEST");
    var page = args.object;
    
}
exports.onLoaded = onLoaded




var model:Model[]=[];
var page;
var counter=0;

 const textFieldBindingOptions: BindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: true
    };
   
   const textFieldBindingOptions1: BindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: true
    };

    const textFieldBindingOptions2: BindingOptions = {
        sourceProperty: "textSource",
        targetProperty: "text",
        twoWay: true
    };


