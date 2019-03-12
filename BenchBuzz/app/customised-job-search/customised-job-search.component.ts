import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe }from '../filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

import { ICustomisedJobSearch, ICustomData } from './icustomised-job-search';
import { CustomisedJobSearchService } from './customised-job-search.service';
import { CommonService } from './common.service';

import{UserService} from '../user/user.service';

@Component({
  selector: 'app-customised-job-search',
  templateUrl: './customised-job-search.component.html',
  styleUrls: ['./customised-job-search.component.css'],
  providers: [CustomisedJobSearchService, FormBuilder]
})



export class CustomizedJobSearchComponent implements OnInit {
    //public size: number;
    //public square: number;
    searchText:string="";
    clusterListDisable: boolean = false;
    clusterListAll:boolean=false;
    showDialog:boolean=false;
    showCluster:boolean=true;
    

    showServiceDialog:boolean=false;

    selectedCityId: number = -1;
    selectedClusterId: number = -1;
    selectedLevelId: number = -1;    

    customSearch: ICustomData[];

    dropdownSkill:any[]=[];
    dropdownCity: any[]=[];
    dropdownLevel: string[][] = new Array();
    dropdownCluster: ICustomisedJobSearch[][] = new Array();
   

    @ViewChild('title') title: ElementRef;
    @ViewChild('myId1') myId1: ElementRef;
    @ViewChild('myId2') myId2: ElementRef;
    @ViewChild('myId3') myId3: ElementRef;
    //@ViewChild('myId4') myId4: ElementRef;

    showCheckBox: boolean = false;
    showSkillName:boolean=false;

    selectedSkillId:any[];
    
    selectedItems:any[];
    settingSkill = {};
    settingCity = {};
    
    loginUser:string;
    statusMessage: string = 'Loading Data. Please Wait...';

    userForm: FormGroup;
    constructor(private _User:UserService ,private _customisedJobSearchService: CustomisedJobSearchService, private _Common: CommonService, private rd: Renderer, private fb: FormBuilder, private router: Router) {
        // this.loginUser=this._User.userInfo();
        // if(this.loginUser == undefined){
        //     this.router.navigate(['\login']);
        // }
        this.userForm = this.fb.group({    
            skills: [[], Validators.required]
        });
        
    } 

    ngOnInit() {
        this.settingSkill = {
            singleSelection: false,
            text: "Select Skills",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            classes: "myclass custom-class"          
          };
          this.settingCity= {
            singleSelection: false,
            text: "Select City",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            badgeShowLimit: 3,
            classes: "myclass custom-class"          
          };
            // this.myForm = this.fb.group({
            //     skillIds: this.fb.array([])
            // });
            var skill: string[][] = new Array();
            var city: string[][] = new Array();
            var level: string[][] = new Array();
            var cluster: ICustomisedJobSearch[][] = new Array();
            //var dropdown:ICustomisedJobSearch[];
            this._customisedJobSearchService.dropDownData()
                .subscribe((dropdownData) => {
                    //dropdown= JSON.parse(dropdownData)
                    //console.log(dropdownData);
                    if(dropdownData.length>0){
                    if (dropdownData.find(x => x.DropdownName === 'SKILL')) {
                        let dropdownSkill = dropdownData.filter(temp => temp.DropdownName === 'SKILL');
                        //console.log(dropdownSkill);
                        //console.log(dropdownSkill[0].DropdownItems.length);

                        if (dropdownSkill.length) {
                            for (var temp in dropdownSkill[0].DropdownItems) {
                                //console.log("skill");
                                //console.log(dropdownSkill[0].DropdownItems[temp].ID);
                                //console.log(dropdownSkill[0].DropdownItems[temp].Item);
                                //skill.push(dropdownSkill[0].DropdownItems[temp].Item + '~' + dropdownSkill[0].DropdownItems[temp].ID);
                                skill.push(dropdownSkill[0].DropdownItems[temp]);
                                //multiSkill.push(dropdownSkill[0].DropdownItems[temp]);
                            }
                        }
                    }
                    this.dropdownSkill = skill;
                    this.dropdownSkill=this.dropdownSkill.map((data) =>{     
                    return{                  
             id:data.ID,
             itemName:data.Item}
         });

                    if (dropdownData.find(x => x.DropdownName === 'CITY')) {
                        let dropdownCity = dropdownData.filter(x => x.DropdownName === 'CITY');
                        if (dropdownCity.length) {
                            for (var temp in dropdownCity[0].DropdownItems) {
                                //console.log("city");
                                //console.log(dropdownCity[0].DropdownItems[temp].ID);
                                //console.log(dropdownCity[0].DropdownItems[temp].Item);
                                //city.push(dropdownCity[0].DropdownItems[temp].Item + '~' + dropdownCity[0].DropdownItems[temp].ID);
                                city.push(dropdownCity[0].DropdownItems[temp]);
                            }
                        }
                    }
                    this.dropdownCity = city;
            //         this.dropdownCity=this.dropdownCity.map((data) =>{     
            //             return{                  
            //      id:data.ID,
            //      itemName:data.Item}
            //  });


                    if (dropdownData.find(x => x.DropdownName === 'LEVEL')) {
                        let dropdownLevel = dropdownData.filter(x => x.DropdownName === 'LEVEL');
                        if (dropdownLevel.length) {
                            for (var temp in dropdownLevel[0].DropdownItems) {
                                //console.log("level");
                                //console.log(dropdownLevel[0].DropdownItems[temp].ID);
                                //console.log(dropdownLevel[0].DropdownItems[temp].Item);
                                //level.push(dropdownLevel[0].DropdownItems[temp].Item + '~' + dropdownLevel[0].DropdownItems[temp].ID);
                                level.push(dropdownLevel[0].DropdownItems[temp]);
                            }
                        }
                    }
                    this.dropdownLevel = level;
                    
                    

                    if (dropdownData.find(x => x.DropdownName === 'CLUSTER')) {
                        let dropdownCluster = dropdownData.filter(x => x.DropdownName === 'CLUSTER');
                        if (dropdownCluster.length) {
                            for (var temp in dropdownCluster[0].DropdownItems) {
                                //console.log("cluster");
                                //console.log(dropdownCluster[0].DropdownItems);
                                //console.log(dropdownCluster[0].DropdownItems[temp].ID);
                                //console.log(dropdownCluster[0].DropdownItems[temp].Item);
                                //cluster.push(dropdownCluster[0].DropdownItems[temp].Item + '~' + dropdownCluster[0].DropdownItems[temp].ID + '~' + dropdownCluster[0].DropdownItems[temp].CityID);
                                cluster.push(dropdownCluster[0].DropdownItems[temp]);
                            }
                        }
                    }
                    this.dropdownCluster = cluster;
                }
                else{
                    this.statusMessage='Problem with the Service, Please Try Again after Sometime';
                    this.showServiceDialog=true;                    
                }
               
                },
                (error) => {
                    this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
                    //alert(this.statusMessage);
                    this.showServiceDialog=true;
                    //console.error(error);
                });

            //this.size = 16;
            //this.square = Math.sqrt(this.size);

            //// Here I call the service to put my data
            //this._Common.setOption('size', this.size);
            //this._Common.setOption('square', this.square);
            
      
    }
    onItemSelect(item: any[]) {
        this.showSkillName=false;
    }
      
      OnItemDeSelect(item: any[]) {
      
    }
    onChangeCity(newValue: number) {
        try {
            if(this.userForm.invalid){
                this.showSkillName=true;
            }
            else{
                this.showSkillName=false;
            }
            this.selectedCityId = newValue;
            //console.log(this.selectedCityId);
            if(this.selectedCityId!=-1){
            var cluster: ICustomisedJobSearch[][] = new Array();
            //var dropdown1:ICustomisedJobSearch[];
            this._customisedJobSearchService.dropDownData()
                .subscribe((dropdownData) => {
                    //dropdown1= JSON.parse(dropdownData);
                    if (dropdownData.find(x => x.DropdownName === 'CLUSTER')) {
                        let dropdownCluster = dropdownData.filter(x => x.DropdownName === 'CLUSTER');
                        //debugger;
                        this.clusterListDisable = false;
                        if (dropdownCluster.length) {
                            for (var temp in dropdownCluster[0].DropdownItems) {
                                if (this.selectedCityId == dropdownCluster[0].DropdownItems[temp].CityID) {
                                    //console.log("city");
                                    ////console.log(dropdownCluster[0].DropdownItems[temp].ID);
                                    ////console.log(dropdownCluster[0].DropdownItems[temp].Item);
                                    ////console.log(dropdownCluster[0].DropdownItems[temp].CityID);
                                    //cluster.push(dropdownCluster[0].DropdownItems[temp].Items + '~' + dropdownCluster[0].DropdownItems[temp].CityID);                               
                                    cluster.push(dropdownCluster[0].DropdownItems[temp]);
                                    ////this.clusterListDisable = false;
                                }
                            }
                        }
                    }
                    //console.log(cluster);
                    if (cluster.length) {
                        this.showCluster=true;
                        this.clusterListDisable = false;
                        this.clusterListAll=false;
                    }
                    else {
                        this.showCluster=false;
                        this.clusterListDisable = true;
                        this.clusterListAll=false;
                    }
                    this.dropdownCluster = cluster;


                },
                (error) => {
                    this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
                    //alert(this.statusMessage);
                    this.showServiceDialog=true;
                    //console.error(error);
                });
        
            
            
            
            
            }
            else{
                this.showCluster=false;
                this.clusterListAll=true;
                this.clusterListDisable = false;
            }
        }
        catch (Error) {
            alert('Something Went Wrong in Customised Job Search');
        }
        
    }
    onChangeLevel(newValue: number) {
        try { 
            if(this.userForm.invalid){
                this.showSkillName=true;
            }
            else{
                this.showSkillName=false;
            }
            this.selectedLevelId = newValue;
         }
        catch (Error) {
            alert('Something Went Wrong in Customised Job Search');
        }
    }
    onChangeCluster(newValue: number) {
        try {
            if(this.userForm.invalid){
                this.showSkillName=true;
            }
            else{
                this.showSkillName=false;
            }
             this.selectedClusterId = newValue;
             }
        catch (Error) { alert('Something Went Wrong in Customised Job Search'); }

    }
   

    
    onRefresh(event:any){
                        this.myId1.nativeElement.value = '';   
                        this.myId2.nativeElement.value = '';
                        //this.myId3.nativeElement.value = '';

                        this.showCluster=true;
                        this.clusterListAll=false;
                        this.clusterListDisable=false;
                        this.selectedItems=[];
                        this.selectedSkillId= [];
                this.showSkillName=false;
                //this.myId3.nativeElement.value = '';
               // window.location.reload();
    }
  
    onSubmit() {
        try {
            const selectedSkillIds =this.selectedSkillId.map(({ id }) => id);      
            this._Common.customizedJobSearch(this.selectedCityId,this.selectedLevelId, this.selectedClusterId, selectedSkillIds)
                .subscribe((customSearchData) => {
                    //debugger;
                    this.customSearch = customSearchData;
                    if (this.customSearch.length) {                        
                        this.myId1.nativeElement.value = '-1';   
                        this.myId2.nativeElement.value = '-1';
                        // if(this.myId3.nativeElement.value==undefined){
                        //this.myId3.nativeElement.value = '-1';
                        // }
                        // else{
                        //     this.myId3.nativeElement.value = '-1';
                            
                        // }
                        this._Common.setData(this.customSearch);
                        this.router.navigate(['/search']);
                    }
                    this.showDialog=true; 
                    //debugger;
                    //this._Common.setData(this.customSearch);

                },
                (error) => {
                    debugger;
                    this.statusMessage = 'Data does not exist for this selection,' + ' Please select according to your skill';
                    //alert(this.statusMessage);

                    this.showDialog=true;                    
                    //this.showCluster=true;
                    this.clusterListAll=false;
                    this.clusterListDisable=false;
                    this.selectedItems=[];
                    this.selectedSkillId= [];
                    this.showSkillName=false;
                    this._Common.setData(this.customSearch = []); 
                                  
                });
        }
        catch (Error) {
            //alert('Please make a proper Selection!');
            //console.log(Error);
                    this.showDialog=true;                    
                    this.showCluster=true;
                    this.clusterListAll=false;
                    this.clusterListDisable=false;
                    this.selectedItems=[];
                    this.selectedSkillId= [];
                    this.showSkillName=false;
                    
        }
        

    }
    
}

