import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer,OnDestroy } from '@angular/core';
//import { FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMyFavourites } from './imy-favourites';
import { CommonService } from '../customised-job-search/common.service';
import { MyFavouritesService } from './my-favourites.service';
import {UserService} from '../user/user.service';
@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css'],
  providers: [MyFavouritesService]
})

export class MyFavouritesComponent implements OnInit{
  tempData: Array<IMyFavourites> = new Array<IMyFavourites>();
  //tempData2: Array<IMyFavourites> = new Array<IMyFavourites>();


  applicationFavData: Array<IMyFavourites> = new Array<IMyFavourites>();
  
  selectedRRD: string;

  isFavourite: boolean;
  isApplied: boolean;

  showButton: boolean = false;

  statusMessage: string = 'Loading Data. Please Wait...';
loginUser:string;
showDialog:boolean=false;
  constructor(private _User:UserService,private _Common: CommonService, private _myFavourites: MyFavouritesService, private router: Router) {
    // this.loginUser=this._User.userInfo();
    // if(this.loginUser == undefined){
    //     this.router.navigate(['\login']);
    // }
  }

  ngOnInit() {
      try {
          //debugger;
          try {
              this.isApplied = false;
              this.isFavourite = true;
              this._myFavourites.getFavouritesStatus(this.isFavourite, this.isApplied)
                  .subscribe((applicationsList) => {
                      //console.log(applicationsList);
                    if(applicationsList != null){
                   this.tempData = this.tempData.concat(applicationsList);
                      //debugger;
                      var resArr: IMyFavourites[] = [];
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
                      if(resArr.find(x=> x.ApplicationStatus==='Rejected')){
                        let arr=resArr.filter(x=> x.ApplicationStatus==='Rejected')
                        //console.log(arr);
                    }
                      this.applicationFavData = resArr;
                      //console.log(this.applicationFavData);
                      //  console.log(this.applicationFavData);
                    }
                    else{
                        this.statusMessage = 'Data Does Not exist for this User!';
                        this.applicationFavData= [];
                    }
                  },
                  (error) => {
                      this.statusMessage = 'Data Does Not exist for this User!';
                      this.showButton = true;
                      //alert(this.statusMessage);
                      //this.router.navigate(['\mainpage']);
                     // console.error(error);
                  });
          }
          catch (error) {              
              //console.log('Data does not Exist');
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
          //debugger;
          this.selectedRRD = RRDNo;
          this._myFavourites.setRRDNumber(this.selectedRRD);

          this._myFavourites.getFavouritesStatusbyRRD()
              .subscribe((applicationsList) => {
                  //console.log(applicationsList);
                  this.applicationFavData = applicationsList;
                    //console.log(this.applicationFavData);
                    if(this.applicationFavData != null){
                  this._Common.setFavouritesDataByRRD(this.applicationFavData, this.selectedRRD);
                                     
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
      catch (Error) { alert('Something Went wrong in My Favourites'); }
    
  }   
}