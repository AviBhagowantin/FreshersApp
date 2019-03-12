import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { EventData } from 'tns-core-modules/data/observable';
import { Label } from 'ui/label';
import { StackLayout } from 'ui/layouts/stack-layout';
import {ElementRef, ViewChild} from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import { Model } from './model';

@Component({
    selector: "CPA",
    moduleId: module.id,
    templateUrl: "./cpa.component.html"
})
export class CpaComponent implements OnInit {

    @ViewChild('stack') stack : ElementRef;
   public cpaScore:any;
   public counter:number;

    constructor() {
        this.cpaScore=0;
        this.counter=0;
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
            let stack_module_words1=new StackLayout();
            let stack_module_words2=new StackLayout();
            let stack_module_words3=new StackLayout();
            
            stack_module_words1.orientation="horizontal";
            stack_module_words2.orientation="horizontal";
            stack_module_words3.orientation="horizontal";

                 var moduletitle=new Label();
            
            var counter_dis=this.counter+1;
            moduletitle.text="Module"+counter_dis;
            

            model[this.counter]=new Model();
            model[this.counter].module_weight = new TextField();
            model[this.counter].module_perc_marks=new TextField();
            model[this.counter].module_credits=new TextField();

            model[this.counter].module_weight.hint="Enter Module Weight";
            model[this.counter].module_perc_marks.hint="Enter % Marks";
            model[this.counter].module_credits.hint="Enter Credits";

            model[this.counter].module_weight.keyboardType="number";
            model[this.counter].module_perc_marks.keyboardType="number";
            model[this.counter].module_credits.keyboardType="number";
            
            model[this.counter].module_weight.bind(textFieldBindingOptions, source);
            model[this.counter].module_perc_marks.bind(textFieldBindingOptions1, source1);
            model[this.counter].module_credits.bind(textFieldBindingOptions2, source2);


             stack_module_words1.addChild(model[this.counter].module_weight);;
             stack_module_words2.addChild(model[this.counter].module_credits);
             stack_module_words3.addChild(model[this.counter].module_perc_marks);

            stack_module_year1.addChild(stack_module_words1);
            stack_module_year1.addChild(stack_module_words2);
            stack_module_year1.addChild(stack_module_words3); 

            myStack.addChild(moduletitle);
            myStack.addChild(stack_module_year1);
            this.counter++;
    }

    calculatecpa(args:EventData):void{
           
    this.cpaScore=0;
        var count;
        var credits_weightage=0;
        var marks_credits_weightage=0;
        for (count = 0; count < this.counter; count++) {

                var credits=parseInt(model[count].module_credits.text);
                var weightage=parseInt(model[count].module_weight.text);
                var marks=parseInt(model[count].module_perc_marks.text);

                credits_weightage=credits_weightage+(credits*weightage);
                marks_credits_weightage=marks_credits_weightage+(credits*weightage*marks);

        }
         
        var cpa=marks_credits_weightage/credits_weightage;
          
         this.cpaScore=cpa.toString();     
    }

}

var model:Model[]=[];


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
