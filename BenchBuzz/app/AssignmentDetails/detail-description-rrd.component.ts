import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IFindAnAssignmentSllList } from './ifind-an-assignment-sll-list';
import { UserService } from '../user/user.service';
import { CommonService } from '../customised-job-search/common.service';
import { DetailDescriptionRRDService } from './detail-description-rrd.service';

import { DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-detail-description-rrd',
  templateUrl: './detail-description-rrd.component.html',
  styleUrls: ['./detail-description-rrd.component.css']
})
export class DetailDescriptionRrdComponent implements OnInit,OnDestroy {

  inputText: string;
  showDialog:boolean=false;
  showErrorDialog:boolean=false;
  
      assignments: IFindAnAssignmentSllList[];
      singleAssignment: IFindAnAssignmentSllList[];
      selectedRRD: string = null;
  
      flagFindAssignment: boolean;
  
      isFavourite: boolean = false;
      isApplied: boolean = false;
  
      returnText: IFindAnAssignmentSllList[];
  
      Details: boolean = true;
      Description: boolean;
  
      showApplyButton: boolean = true;
      showFavButton: boolean = true;
      DetailParagraph:string;
      statusMessage: string = 'Loading Data. Please Wait...';
  
      loginUser:string;

      roleString:string;
      descString:string;
      mustString:string;
      optionalString:string;

      constructor(private _Common: CommonService, private _User: UserService, private _DetailDesc: DetailDescriptionRRDService, private router: Router) {
          this.selectedRRD = this._Common.getRRDNumber();
          this.inputText = _User.userInfo();
      }
  
      ngOnInit() {
          try {
              //console.log('1'); 
              //console.log(this._Common.getApplicationDataByRRD().find(x => x.RRDNumber === this.selectedRRD));
              //console.log((this._Common.getApplicationDataByRRD() != undefined) && (!(this._Common.getFlagFindAssignment())));
              // console.log((this._Common.getFavouritesDataByRRD() != undefined) && (!(this._Common.getFlagFindAssignment())));
              //this._Common.getFavouritesDataByRRD().find(x => x.RRDNumber === this.selectedRRD)
                        
              if ((this._Common.getApplicationDataByRRD() != undefined )) {
                 // console.log(this._Common.getApplicationDataByRRD());

                  if (this._Common.getApplicationDataByRRD().find(x => x.RRDNumber === this.selectedRRD)) {
                      //console.log('3');
                      this.showApplyButton = false;
                      this.singleAssignment = this._Common.getApplicationDataByRRD();
                      setTimeout(()=>{ 
                            },1000);  
                        
                      this.assignments = this.singleAssignment;  
                      this.DetailParagraph=(this.singleAssignment.map(x=> x.DemandDetails)).toString();                     
                      this.roleString= this.DetailParagraph.substring(this.DetailParagraph.indexOf(':')+2,this.DetailParagraph.search('Role Description'));  
                      this.descString= this.DetailParagraph.substring(this.DetailParagraph.search('Role Description')+19,this.DetailParagraph.search('M'));                     
                      this.mustString= this.DetailParagraph.substring(this.DetailParagraph.search('M')+19,this.DetailParagraph.search('Good to Have Skills :'));                     
                      this.optionalString= this.DetailParagraph.substring(this.DetailParagraph.search('G')+23,this.DetailParagraph.search('J'));                                                           
                  }          
              }
               if ((this._Common.getFavouritesDataByRRD() != undefined )) {
                  //console.log(this._Common.getFavouritesDataByRRD());
                  this._Common.setFlagAssignment();
                  if (this._Common.getFavouritesDataByRRD().find(x => x.RRDNumber === this.selectedRRD)) {
                      //console.log('5');
                      this.showApplyButton = true;
                      this.showFavButton = false;
                      this.singleAssignment = this._Common.getFavouritesDataByRRD();
                      setTimeout(()=>{ 
                    },1000);  
                  
                      this.assignments = this.singleAssignment;
                      this.DetailParagraph=(this.singleAssignment.map(x=> x.DemandDetails)).toString();
                          this.roleString= this.DetailParagraph.substring(this.DetailParagraph.indexOf(':')+2,this.DetailParagraph.search('Role Description'));
                          this.descString= this.DetailParagraph.substring(this.DetailParagraph.search('Role Description')+19,this.DetailParagraph.search('M'));
                          this.mustString= this.DetailParagraph.substring(this.DetailParagraph.search('M')+19,this.DetailParagraph.search('Good to Have Skills :'));
                          this.optionalString= this.DetailParagraph.substring(this.DetailParagraph.search('G')+23,this.DetailParagraph.search('J'));
                          }
              }
              
              
    //console.log((this._Common.getFlagFindAssignment()));
    // console.log();
    
    //debugger;  
               if ((this._Common.getFlagFindAssignment())) {
                 // console.log('6');
                  //this.showApplyButton = true;
                  //this.showFavButton = true;
                    this.selectedRRD = this._Common.getRRDNumber();
                  
                  //debugger;
                  //console.log(this.selectedRRD);
                  this._DetailDesc.getDetailDescriptionDataByRRD(this.selectedRRD)
                      .subscribe((assignmentData) => {
                          this.assignments = assignmentData;
                          this.DetailParagraph=(assignmentData.map(x=> x.DemandDetails)).toString();
                          //console.log(this.DetailParagraph.includes('Role'));
                          //console.log(this.DetailParagraph.search('Role Description'));
                          //this.DetailParagraph.find(x=> x.match('//')).match(re)
                          this.roleString= this.DetailParagraph.substring(this.DetailParagraph.indexOf(':')+2,this.DetailParagraph.search('Role Description'));
                          //console.log(this.roleString);
                          this.descString= this.DetailParagraph.substring(this.DetailParagraph.search('Role Description')+19,this.DetailParagraph.search('M'));
                          //console.log(this.descString);
                          this.mustString= this.DetailParagraph.substring(this.DetailParagraph.search('M')+19,this.DetailParagraph.search('Good to Have Skills :'));
                         // console.log(this.mustString);
                          this.optionalString= this.DetailParagraph.substring(this.DetailParagraph.search('G')+23,this.DetailParagraph.search('J'));
                          //console.log(this.optionalString);
                         
                          //console.log(this.DetailParagraph);
                          
                      },
                      (error) => {
                          this.statusMessage = 'Problem with the Service,Data does not exist for this Assignment';
  
                          //console.error(error);
                      });
                    //   for (var i = 0; i < this._Common.getApplicationDataByRRD.length; i++) {
                    //     for (var j = 0; j < this._Common.getFavouritesDataByRRD.length; j++) {
                    //         if (this._Common.getApplicationDataByRRD[j].RRDNumber === this._Common.getFavouritesDataByRRD[i].RRDNumber) {
                    //            console.log('1');
                               
                    //         }
                    //     }
                    // }    
              }  
            
            }
          catch (Error) { alert('Something Went Wrong to Fetch Details and Description'); }
      }
  
      showDetails() {
          try {
              this.Details = true;
              this.Description = false;
          }
          catch (Error) { alert('Something Went Wrong'); }
      }
      showDescription() {
          try {
              this.Description = true;
              this.Details = false;
          }
          catch (Error) { alert('Something Went Wrong'); }
      }
      navigateMainPage() {
          this.router.navigate(['\mainpage']);
      }
      
  
       
    
      
      applyForAssignment() {
          try {
              this.isApplied = true;
            //   setTimeout(()=>{ this.showDialog=true; }, 4000)
              this._DetailDesc.applyForAssignment(this.selectedRRD, this.isApplied, this.isFavourite)
                  .subscribe((textData) => {
                      this.returnText = textData;
                      //console.log(this.returnText);
                      //alert('Data Inserted Successfully!');
                      this.showDialog = true;    
                      this.showApplyButton=false;
                //       setTimeout(()=>{                           
                //         this.router.navigate(['/mainpage']);
                //    },3000);  
                  },
                  (error) => {
                      this.statusMessage = 'Problem with the Service,Invalid Job Details';
                      //console.error(error);
                      this.showErrorDialog=true;
                  });
          }
          catch (Error) { alert('Something Went Wrong in Applying an Assignment'); }
      }
      applyFavourite() {
          try {
              this.isFavourite = true;
            //   setTimeout(()=>{ this.showDialog=true; }, 4000)           
              this._DetailDesc.applyFavourite(this.selectedRRD, this.isApplied, this.isFavourite)                  
              .subscribe((textData) => {
                      this.returnText = textData;
                      //console.log(this.returnText);
                      //alert('Data Inserted Successfully!'); 
                      this.showDialog = true;  
                      this.showFavButton=false; 
                //       setTimeout(()=>{                           
                //         this.router.navigate(['/mainpage']);
                //    },3000);                      
                  },
                  (error) => {
                      this.statusMessage = 'Problem with the Service,Invalid Job Details';
                     // console.error(error);
                     this.showErrorDialog=true;
                  });
          }
          catch (Error) { alert('Something Went Wrong in Applying for Favourites'); }
      }
      ngOnDestroy(){
          this._Common.setApplicationData([]);
          this._Common.setFavouritesData([]);         
          this._DetailDesc.findAnAssignmentData=[]; 
          this.singleAssignment=[];
          this.assignments=[];
      }
}


