import { Component,OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { IFindAnAssignmentSllList } from './ifind-an-assignment-sll-list';
import { FindAnAssignmentSllListService } from './find-an-assignment-sll-list.service';
import { UserService } from '../user/user.service';
import { CommonService } from '../customised-job-search/common.service';
import { DetailDescriptionRRDService } from './detail-description-rrd.service';

@Component({
  selector: 'app-find-an-assignment-sll-list',
  templateUrl: './find-an-assignment-sll-list.component.html',
  styleUrls: ['./find-an-assignment-sll-list.component.css'],
  providers: [FindAnAssignmentSllListService]
})

export class FindAnAssignmentSllListComponent implements OnInit, OnDestroy{
    inputText: string;

    showDialog:boolean=false;
    show: boolean ;

    Details: boolean = true;
    Description: boolean;
    selectedRRD: string;    
    //public config:string;
    assignments: IFindAnAssignmentSllList[];
    statusMessage: string = 'Loading Data. Please Wait...';
    loginUser:string;
    constructor(private _findAssignment: FindAnAssignmentSllListService, private _User: UserService, private _Common: CommonService, private router: Router, private _DetailDesc: DetailDescriptionRRDService) {        
        //console.log(this.userName);
        //debugger;
        this.inputText = _User.userInfo();
        // this.loginUser=this._User.userInfo();
        // if(this.loginUser == undefined){
        //     this.router.navigate(['\login']);
        // }
        // try {
        //     ////console.log('1');
        //     this._User.setEnterpriseId(this.inputText);
        //     //console.log(this.inputText);    
        //     //debugger;
        //     this._User.userData(this.inputText)
        //         .subscribe((userData) => {
        //             //console.log('2');
        //             if (userData.length > 0) {
        //                 if (userData.find(x => x.RoleValue === 1)) {
        //                     //console.log('1');
        //                 }
        //                 else if (userData.find(x => x.RoleValue === 2)) {
        //                     //console.log('2');
        //                 }
        //                 else if (userData.find(x => x.RoleValue === 3)) {
        //                     //console.log('3');
        //                 }
        //                 else {
        //                     //  console.log('4');
        //                     this.router.navigate(['/noaccess']);
        //                 }
        //             }
        //             else {
        //                 // console.log('5');
        //                 alert('Something Went Wrong');
        //             }

        //         },
        //         (error) => {
        //             //this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
        //             this.router.navigate(['/serverDown']);
        //             //console.error(error);
        //         });
        // }
        // catch (Error) { alert('Something Went Wrong in MainPage'); }
    }
    ngOnInit() {
        try {
            this._findAssignment.findAnAssignmentSllList()
                .subscribe((assignmentData) => {                    
                    if(assignmentData){                   
                    this.assignments = assignmentData;
                    //console.log(this.assignments);
                    this._Common.setAssignmentData(this.assignments);                   
                    }
                    else{
                    this.statusMessage = 'There is no Job Assigment Matching this User';
                    this.showDialog=true;                    
                    setTimeout(()=>{                           
                        this.router.navigate(['/mainpage']);
                   },2000);
                    }
                },
                (error) => {
                    this.statusMessage = 'There is no Job Assigment Matching this User';
                    //alert(this.statusMessage);
                    this.showDialog=true;
                    //console.error(error);
                    setTimeout(()=>{                           
                        this.router.navigate(['/mainpage']);
                   },2000);
                });
        }
        catch (Error) { alert('Something Went Wrong in Find an Assignment');}       
    }

    ngOnDestroy() {
        this.assignments;
    }

    showDetails() {
        this.Details = true;
        this.Description = false;
    }
    showDescription() {
        this.Description = true;
        this.Details = false;
    }

    moveToAssignmentDetails(RRDNo: string) {
        try {
            this.selectedRRD = RRDNo;
            this._Common.setRRDNumber(this.selectedRRD);
            this.router.navigate(['/detailDescriptionRRD']);
        //this._DetailDesc.setRRDNumber(this.selectedRRD);
        //console.log(this.selectedRRD);
        }
        catch (Error) { alert('Something Went Wrong  in Find an Assignment');}        
    }            
}
