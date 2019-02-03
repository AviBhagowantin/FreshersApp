import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {ActivatedRoute} from "@angular/router";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array"
import {ElementRef, ViewChild} from "@angular/core";
import { StackLayout } from 'ui/layouts/stack-layout';
import { Label } from 'ui/label';
import config from "./rules.json";

const labelModule = require("tns-core-modules/ui/label");


@Component({
    selector: "Ruledetails",
    moduleId: module.id,
    templateUrl: "./ruledetails.component.html"
})


export class RuledetailsComponent implements OnInit {

	public chapter:string;

	 @ViewChild('actionbartitle') actionbartitle : ElementRef;
	 @ViewChild('stack') stack : ElementRef;

    public constructor(private route: ActivatedRoute) {
        
    }

    ngOnInit(): any {

    	const myTitle: Label = <Label>this.actionbartitle.nativeElement;


        this.route.queryParams.subscribe(params => {
            this.chapter = params["Chapters"];
  			
        });

        var chapter_num=parseInt(this.chapter);
    	let array = new ObservableArray(config.rules);

    	myTitle.text=array.getItem(chapter_num-1).title;

    	let section= new ObservableArray(array.getItem(chapter_num-1).section);
    	const myStack: StackLayout = this.stack.nativeElement;

    	let section_details=new StackLayout();

    	
    	

    	for(let i=0; i< section.length+1;i++){

    	const section_title = new labelModule.Label();
    	const section_text = new labelModule.Label();


    	section_title.text=section.getItem(i).section_number+ " " +section.getItem(i).section_title;
    	section_text.text=section.getItem(i).section_text;

    	section_title.textwrap=true;
    	section_text.textWrap=true;

    	section_details.addChild(section_title);
		section_details.addChild(section_text);

		myStack.addChild(section_details);
		}

    }

   
}
