import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
//import { FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { CustomizedJobSearchComponent } from './customised-job-search.component';
import { ICustomData } from './icustomised-job-search';
import { CommonService } from './common.service';

import {UserService} from '../user/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
    //public config:any;
    //public header:any = [];

    getData: ICustomData[];

    selectedRRD: string;
    loginUser:string;
    constructor(private _User:UserService,private _Common: CommonService, private rd: Renderer, private router: Router) {
        // this.loginUser=this._User.userInfo();
        // if(this.loginUser == undefined){
        //     this.router.navigate(['\login']);
        // }
    }

    ngOnInit() {
        this.getData = this._Common.getData();
    }

    moveToAssignmentDetails(RRDNo: string) {
        this.selectedRRD = RRDNo;
        this._Common.setRRDNumber(this.selectedRRD);
        //console.log(this.selectedRRD);
        this.router.navigate(['/detailDescriptionRRD']);
    }
    navigateSearch() {
        this.router.navigate(['/customisedJobSearch']);
    }

}
