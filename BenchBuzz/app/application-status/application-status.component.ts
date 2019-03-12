import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer,OnDestroy } from '@angular/core';
//import { FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IApplicationStatus } from './iapplication-status';
import { CommonService } from '../customised-job-search/common.service';
import { ApplicationStatusListService } from './application-status-list.service';

import {UserService} from '../user/user.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css'],
  providers: [ApplicationStatusListService]
})


export class ApplicationStatusComponent implements OnInit{
    tempData: Array<IApplicationStatus> = new Array<IApplicationStatus>();
    ////tempData2: Array<IApplicationStatus> = new Array<IApplicationStatus>();
    
    applicationData: Array<IApplicationStatus> = new Array<IApplicationStatus>();

    selectedRRD: string;

    isFavourite: boolean;
    isApplied: boolean;    

    showButton: boolean = false;
    statusMessage: string = 'Loading Data. Please Wait...';
    loginUser:string;
    showDialog:boolean=false;
    constructor(private _User:UserService,private _Common: CommonService, private _ApplicationStatusList: ApplicationStatusListService, private router: Router) {       
       
    }

    ngOnInit() {    
        try {
            
            try {
                //debugger;
                // this.isFavourite = true;
                // this.isApplied = true;
                // this._ApplicationStatusList.getApplicationStatus(this.isFavourite, this.isApplied)
                //     .subscribe((applicationsList) => {
                //         //console.log(applicationsList);
                //         //this.tempData1 = applicationsList;
                //        // console.log(this.tempData1);
                //         //this._Common.setTempApplicationData1(this.tempData1);
                //         this.tempData = this.tempData.concat(applicationsList);
                //         //console.log(this.applicationData);
                //     },
                //     (error) => {
                //         this.statusMessage = 'Data Does Not exist for this User!';
                //         //alert(this.statusMessage);
                //         //this.router.navigate(['\applicationStatus']);
                //       //  console.error(error);
                //     });

                this.isFavourite = false;
                this.isApplied = true;                
                this._ApplicationStatusList.getApplicationStatus(this.isFavourite, this.isApplied)
                    .subscribe((applicationsList) => {
                        if(applicationsList != null){
                            //debugger;
                     this.tempData = this.tempData.concat(applicationsList);                       
                        var resArr: IApplicationStatus[] = [];
                        this.tempData.filter(function (item) {
                            var i = resArr.findIndex(x => x.RRDNumber == item.RRDNumber);
                            if (i <= -1) {
                                resArr.push({
                                    AssignedRole: item.AssignedRole,
                                    PocName: item.PocName,
                                    DemandDetails: item.DemandDetails,
                                    CreatedDate: item.CreatedDate,
                                    ClientName: item.ClientName,
                                    SkillName: item.SkillName,
                                    RRDNumber: item.RRDNumber,
                                    RRDCount: item.RRDCount,
                                    ReqdBy: item.ReqdBy,
                                    Location: item.Location,
                                    Facility: item.Facility,
                                    CareerLevel: item.CareerLevel,
                                    ApplicationStatus: item.ApplicationStatus,
                                    RejectionStatus: item.RejectionStatus
                                });
                            }
                            return null;
                        });
                        this.showButton = false;
                        // if(resArr.find(x=> (x.ApplicationStatus==='Role Closed' || x.ApplicationStatus==='Rejected' || x.ApplicationStatus==='Resource not available for Staffing'))){
                            
                        //     let arr=resArr.filter(x=> x.ApplicationStatus==='Rejected')
                        //   //  console.log(arr);
                        // }
                        this.applicationData = resArr;
                       // console.log(this.applicationData);
                    }
                    
                    else{
                        //debugger;
                        this.statusMessage = 'Data Does Not exist for this User!';
                        this.applicationData= [];
                    }
                    },
                    (error) => {
                        //debugger;
                        this.statusMessage = 'Data Does Not exist for this User!';
                        this.showButton = true;
                        //alert(this.statusMessage);
                        //this.router.navigate(['\mainpage']);
                        //console.error(error);
                    });
            }
            catch (error) {               
                console.log('Data does not Exist');
            }
            }        
        catch (error) {
            this.statusMessage = 'Problem with the Service,Data does not exist for this User';
            //this.showModal = true;
        }   
    }


    navigateMainPage() {
        this.router.navigate(['\mainpage']);
    }

    moveToAssignmentDetails(RRDNo: string) {
        try {
            
            this.selectedRRD = RRDNo;
            this._ApplicationStatusList.setRRDNumber(this.selectedRRD);
            this._ApplicationStatusList.getApplicationStatusbyRRD()
                .subscribe((applicationsList) => {
                    //debugger;
                    //console.log(applicationsList);                    
                    this.applicationData = applicationsList;
                    if(this.applicationData != null){
                    this._Common.setApplicationDataByRRD(this.applicationData, this.selectedRRD);
                    this.router.navigate(['/detailDescriptionRRD']);
                    }
                    else{
                        this.showDialog=true;
                        setTimeout(()=>{ 
                            this.router.navigate(['/mainpage']);
                        },2000);       
                    }
                },
                (error) => {
                    this.statusMessage = 'Problem with the Service,Data does not exist for this user';
                    
                    //console.error(error);
                });
        //console.log(this.selectedRRD);
        //this._Common.setRRDNumber(this.selectedRRD);
        //this.router.navigate(['/detailDescriptionRRD']);
        }
        catch (Error) { alert('Something Went Wrong in Application Status'); }
    }
}