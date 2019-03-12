import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';

declare var $:any;

import { IUpdateProfile, IGetUpdateProfileDetails } from './iupdate-profile';
import { UpdateProfileService } from './update-profile.service';
import { CommonService } from '../customised-job-search/common.service';
import { UserService } from '../user/user.service';

import {FileValidator} from '../Others/file-input-validator'
// import { error } from 'protractor';

import { DatePipe } from '@angular/common'

import {IMyDpOptions} from 'mydatepicker';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  providers:[FileValidator]
})
// export class Serializable {

//     fromJSON(json) {
//         for (var propName in json)
//             this[propName] = json[propName];
//         return this;
//     }

// }
export class UpdateProfileComponent implements OnInit {
      showDialog:boolean=false;
      showUpdateDialog:boolean=false;
      
      inputText: string;
  
      myVar: boolean = false;
      checkBoxCrossTrain: boolean = false;
      checkBoxRelocate: boolean = false;
      checkBoxMLV: boolean = false;
      checkBoxMaternity: boolean = false;
      checkBoxLOA: boolean = false;
      checkBoxVacation: boolean = false;
      checkBoxVisa: boolean = false;
      isCVUploaded:boolean=false;
      dropdownCity: string[][] = new Array();
      dropdownFirstPrefCity: string[][] = new Array();
      dropdownSecondPrefCity: string[][] = new Array();
      dropdownCountry: string[][] = new Array();
  
      selectedCityId: number=0 ;
      selectedFirstPrefCityId: number =0;
      selectedSecondPrefCityId: number =0;
      selectedCountryId: number =0;
  
      MaternityFrom: Date;
      MaternityTo: Date;
      LOAFrom: Date;
      LOATo: Date;
      VacationFrom: Date;
      VacationTo: Date;
  
      AlternateContactNumber: string;
  
      isUploadBtn: boolean = true;
  
      returnText: IUpdateProfile[];
      updateFormData:IGetUpdateProfileDetails[];

      formData: FormData = new FormData();
      files: FileList;
      filestring: string;
      fileName: string;
      file: File;
      Logo: string;
    loginUser:string;
    //uploadFile:boolean=false;
      statusMessage: string = 'Loading Data. Please Wait...';
      frm = new FormGroup({});
      public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        //disableUntil:{year: 0, month: 0, day: 0}
      };
      
      // Initialized to specific date (09.10.2018).
      public modelMFrom: any ;
      public modelMTo: any ;
      public modelLFrom: any ;
      public modelLTo: any ;
      public modelVFrom: any ;
      public modelVTo: any ;
     
      constructor(private _http: Http, private _User: UserService, private _Update: UpdateProfileService, private rd: Renderer, private router: Router,fb: FormBuilder,public datepipe: DatePipe) {
          this.inputText = this._User.userInfo(); 
          //this.model= { date: { year: 2018, month: 10, day: 9 } };
       //console.log(this.inputText);
          this.buildForm();
          try {   
              this._User.setEnterpriseId(this.inputText);            
              this._User.userData(this.inputText)
                  .subscribe((userData) => {
                      //console.log('2');
                      if (userData.length > 0) {
                          if (userData.find(x => x.RoleValue === 1)) {
                              //console.log('1');
                              this.Logo = 'http://cmtindiastream.accenture.com/api/content/uploadfile/cv/' + this.inputText + '.pdf';
                          }
                          else if (userData.find(x => x.RoleValue === 2)) {
                              //console.log('2');
                              this.Logo = 'http://cmtindiastream.accenture.com/api/content/uploadfile/cv/' + this.inputText + '.pdf';
                          }
                          else if (userData.find(x => x.RoleValue === 3)) {
                              //console.log('3');
                              this.Logo = 'http://cmtindiastream.accenture.com/api/content/uploadfile/cv/' + this.inputText + '.pdf';
                          }
                          else {
                              //  console.log('4');
                              this.router.navigate(['/noaccess']);
                          }
                      }
                      else {
                          // console.log('5');
                          alert('Something Went Wrong');
                      }
  
                  },
                  (error) => {
                      //this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
                      this.router.navigate(['/serverDown']);
                      //console.error(error);
                  });
          }
          catch (Error) { alert('Something Went Wrong in Update Profile'); }
         
          //this.headers = new Headers();
          //this.headers.set('Content-Type', 'multipart/form-data');
      }
      private buildForm() {
        this.frm = new FormGroup({
            file: new FormControl("", [FileValidator.validate]),
            
        });
    }
      ngOnInit() {
          try {    
            var city: string[][] = new Array();
            var country: string[][] = new Array();
            //var dropdown:string[];

//console.log('inside oninit');

            this._Update.updateFormData(this.inputText)
                        .subscribe((updateDetails)=>
            {
                this.updateFormData=updateDetails['Data'];
//console.log(this.updateFormData);
                for(var temp in this.updateFormData[0]){
                    this.checkBoxVisa=this.updateFormData[0].IsVisa;
                    this.checkBoxCrossTrain=this.updateFormData[0].IsCrossTrain;
                    this.checkBoxRelocate=this.updateFormData[0].IsRelocate;
                    this.checkBoxMaternity=this.updateFormData[0].IsMaternity;
                    this.checkBoxVacation=this.updateFormData[0].IsVacation;
                    this.checkBoxLOA=this.updateFormData[0].IsLOA;
                    this.isCVUploaded=this.updateFormData[0].IsCV_Uploaded;

                    this.MaternityFrom=this.updateFormData[0].MaternityFrom;
                    this.MaternityTo=this.updateFormData[0].MaternityTo;
                    this.VacationFrom=this.updateFormData[0].VacationFrom;
                    this.VacationTo=this.updateFormData[0].VacationTo;
                    this.LOAFrom=this.updateFormData[0].LOAFrom;
                    this.LOATo=this.updateFormData[0].LOATo;

                    this.selectedCityId=this.updateFormData[0].LocationID;
                    this.selectedCountryId=this.updateFormData[0].VisaCountryID;
                    this.selectedFirstPrefCityId=this.updateFormData[0].Prefrerence1;
                    this.selectedSecondPrefCityId=this.updateFormData[0].Prefrerence2;
                    this.AlternateContactNumber=(this.updateFormData[0].AlternateContact).toString();
                    
             }
            var currentDate =new Date();
  //console.log(this.selectedCityId);
            // var currDateStr =
            // currentDate.getMonth()+'/'+
            // currentDate.getDate() +'/'+ 
            // currentDate.getFullYear().toString().substr(2,2) +' '+
            // (currentDate.getHours()<10?'0'+currentDate.getHours():''+currentDate.getHours())+':'+
            // (currentDate.getMinutes()<10?'0'+currentDate.getMinutes():''+currentDate.getMinutes())+':'+
            // (currentDate.getSeconds()<10?'0'+currentDate.getSeconds():''+currentDate.getSeconds())+' '+
            // (currentDate.getHours()>= 12 ? 'PM' : 'AM');
           var mFrom=new Date(this.MaternityFrom);
           var mTo=new Date(this.MaternityTo);
           var lFrom=new Date(this.LOAFrom);
           var lTo= new Date(this.LOATo);
           var vFrom=new Date(this.VacationFrom);
           var vTo= new Date(this.VacationTo);                     
           
            this.modelMFrom= { date: { year: (isNaN(mFrom.getFullYear())? currentDate.getFullYear():mFrom.getFullYear()), month: (isNaN((mFrom.getMonth()+1))? currentDate.getMonth()+1:(mFrom.getMonth()+1)), day: (isNaN(mFrom.getDate())? '1':mFrom.getDate()) } };
            this.modelMTo= { date: { year: (isNaN(mTo.getFullYear())? currentDate.getFullYear():mTo.getFullYear()), month: (isNaN((mTo.getMonth()+1))? currentDate.getMonth()+1:(mTo.getMonth()+1)), day: (isNaN(mTo.getDate())? '1':mTo.getDate()) } };
            this.modelLFrom= { date: { year: (isNaN(lFrom.getFullYear())? currentDate.getFullYear():lFrom.getFullYear()), month: (isNaN((lFrom.getMonth()+1))? currentDate.getMonth()+1:(lFrom.getMonth()+1)), day: (isNaN(lFrom.getDate())? '1':lFrom.getDate()) } };
            this.modelLTo= { date: { year: (isNaN(lTo.getFullYear())? currentDate.getFullYear():lTo.getFullYear()), month: (isNaN((lTo.getMonth()+1))? currentDate.getMonth()+1:(lTo.getMonth()+1)), day: (isNaN(lTo.getDate())? '1':lTo.getDate()) } };
            this.modelVFrom= { date: { year: (isNaN(vFrom.getFullYear())? currentDate.getFullYear():vFrom.getFullYear()), month: (isNaN((vFrom.getMonth()+1))? currentDate.getMonth()+1:(vFrom.getMonth()+1)), day: (isNaN(vFrom.getDate())? '1':vFrom.getDate()) } };
            this.modelVTo= { date: { year: (isNaN(vTo.getFullYear())? currentDate.getFullYear():vTo.getFullYear()), month: (isNaN((vTo.getMonth()+1))? currentDate.getMonth()+1:(vTo.getMonth()+1)), day: (isNaN(vTo.getDate())? '1':vTo.getDate()) } };
         
            if(currentDate > lTo){
                this.checkBoxLOA=false;
                this.LOAFrom=null;
                this.LOATo=null;  
            }

            if(currentDate > mTo){
                this.checkBoxMaternity=false;
                this.MaternityFrom = null;
                this.MaternityTo=null; 
            }
            
            if(currentDate > vTo){
                this.checkBoxVacation=false;
                this.VacationFrom=null;
                this.VacationTo=null;
            }           
            },
                        (error) => {
                this.statusMessage = 'Redirecting to Update page for New User';
                //alert(this.statusMessage);
                this.showDialog=true;
                this.router.navigate(['/updateNew']);
                //console.error(error);
            });       
            //console.log('after update form');
            //var dropdown:IUpdateProfile[];
            //debugger;
            this._Update.dropDownData()
            .subscribe((dropdownData) => {
                //console.log(dropdownData);
         //dropdown=JSON.parse(dropdownData);
         //debugger;
        
//console.log(dropdown.filter(x => x.DropdownName== 'CITY'));   
if(dropdownData.length>0){
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
this.dropdownSecondPrefCity = city;

if (dropdownData.find(x => x.DropdownName === 'COUNTRY')) {
let dropdownCountry = dropdownData.filter(x => x.DropdownName === 'COUNTRY');
if (dropdownCountry.length) {
    for (var tempData in dropdownCountry[0].DropdownItems) {
        //console.log("city");
        //console.log(dropdownCountry[0].DropdownItems[temp].ID);
        //console.log(dropdownCountry[0].DropdownItems[temp].Item);
        //city.push(dropdownCitdropdownCountryy[0].DropdownItems[temp].Item + '~' + dropdownCountry[0].DropdownItems[temp].ID);
        country.push(dropdownCountry[0].DropdownItems[tempData]);
    }
}
}
this.dropdownCountry = country;
}
},
            (error) => {
this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
//alert(this.statusMessage);
this.showDialog=true;
//console.error(error);
});                  
  
        }
          catch (Error) { alert('Something Went Wrong in Update Profile'); }        
      }
  
       
      onChangeMaternity(newValue: boolean) {
          try {
              this.checkBoxMaternity = newValue;
             // console.log(this.checkBoxMaternity);
          }
          catch (Error) { alert('Something went wrong in Change of Maternity option'); }
          
      }
      onChangeLOA(newValue: boolean) {
          try {
          this.checkBoxLOA = newValue;
             // console.log(this.checkBoxLOA);
          }
          catch (Error) { alert('Something Went wrong in Change of LOA option'); }
         
      }
      onChangeVacation(newValue: boolean) {
          try {
          this.checkBoxVacation = newValue;
             // console.log(this.checkBoxVacation);
          }
          catch (Error) { alert('Something Went Wrong in Change of Vacation Option'); }
      }
      onChangeCrossTrain(newValue: boolean) {
          try {
          this.checkBoxCrossTrain = newValue;
             // console.log(this.checkBoxCrossTrain);
          }
          catch (Error) { alert('Something Went Wrong in Change of Cross Train Option'); }
          
      }
      onChangeRelocate(newValue: boolean) {
          try {
          this.checkBoxRelocate = newValue;
             // console.log(this.checkBoxRelocate);
          }
          catch (Error) { alert('Something Went Wrong in Change of Relocate Option'); }
      }
      onChangeVisa(newValue: boolean) {
          try {
              this.checkBoxVisa = newValue;
          }
          catch (Error) { alert('Something Went Wrong in Change of Visa Option'); }
      }
      onChangeCity(newValue: number) {
          try {
              this.selectedCityId = newValue;
             // console.log(this.selectedCityId);
          }
          catch (Error) { alert('Something Went Wrong in Change of City'); }
      }
      onChangeFirstPrefCity(newValue: number) {
          try {
              this.selectedFirstPrefCityId = newValue;
             // console.log(this.selectedFirstPrefCityId);
  
              var city: string[][] = new Array();
              //var dropdown1:IUpdateProfile[];
              this._Update.dropDownData()
                  .subscribe((dropdownData) => {
                   // dropdown1=JSON.parse(dropdownData);
                      if (dropdownData.find(x => x.DropdownName === 'CITY')) {
                          let dropdownCity = dropdownData.filter(x => x.DropdownName === 'CITY');
                          if (dropdownCity.length) {
                              for (var temp in dropdownCity[0].DropdownItems) {
                                  if (this.selectedFirstPrefCityId != dropdownCity[0].DropdownItems[temp].ID) {
                                      //console.log("city");
                                      //console.log(dropdownCity[0].DropdownItems[temp].ID);
                                      //console.log(dropdownCity[0].DropdownItems[temp].Item);
                                      //city.push(dropdownCity[0].DropdownItems[temp].Item + '~' + dropdownCity[0].DropdownItems[temp].ID);
                                      city.push(dropdownCity[0].DropdownItems[temp]);
                                  }
                              }
                          }
                      }
                      this.dropdownSecondPrefCity = city;
  
                  },
                  (error) => {
                      this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
                      //alert(this.statusMessage);
                      this.showDialog=true;
                      //console.error(error);
                  });
          }
          catch (Error) { alert('Something Went Wrong in Change of First Preference'); }
  
      }
      onChangeSecondPrefCity(newValue: number) {
          try {
              this.selectedSecondPrefCityId = newValue;
             // console.log(this.selectedSecondPrefCityId);
          }
          catch (Error) { alert('Something Went Wrong in Change of Second Preference'); }
      }
      onChangeCountry(newValue: number) {
          try {
              this.selectedCountryId = newValue;
             // console.log(this.selectedCountryId);
          }
          catch (Error) { alert('Something Went Wrong in Change of Country Option'); }
      }
    //   disableUntil(disDate:Date) {
    //       debugger;
    //     //let d:Date= disDate['date'];
    //     // d.setDate(d.getDate() - 1);
    //     let copy = this.getCopyOfOptions();
    //     copy.disableUntil = {year: disDate['date'].year, 
    //                          month: disDate['date'].month, 
    //                          day: disDate['date'].day};
    //     this.myDatePickerOptions = copy;
    // }
    //   getCopyOfOptions(): IMyDpOptions {
    //     return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    // }
      onSubmit(event: any) {
        try {
            if (this.inputText != (undefined || null) ) {                
              //this.uploadFile=true;
            //   var matFrom= (this.modelMFrom['date'].year)+'-'+( (this.modelMFrom['date'].month>10 )? this.modelMFrom['date'].month:'0'+this.modelMFrom['date'].month) +'-'+ ((this.modelMFrom['date'].day>10 )? this.modelMFrom['date'].day:'0'+this.modelMFrom['date'].day);
            //   var matTo= (this.modelMTo['date'].year)+'-'+( (this.modelMTo['date'].month>10 )? this.modelMTo['date'].month:'0'+this.modelMTo['date'].month) +'-'+ ((this.modelMTo['date'].day>10 )? this.modelMTo['date'].day:'0'+this.modelMTo['date'].day);
            //   var loaFrom= (this.modelLFrom['date'].year)+'-'+( (this.modelLFrom['date'].month>10 )? this.modelLFrom['date'].month:'0'+this.modelLFrom['date'].month) +'-'+ ((this.modelLFrom['date'].day>10 )? this.modelLFrom['date'].day:'0'+this.modelLFrom['date'].day);
            //   var loaTo= (this.modelLTo['date'].year)+'-'+( (this.modelLTo['date'].month>10 )? this.modelLTo['date'].month:'0'+this.modelLTo['date'].month) +'-'+ ((this.modelLTo['date'].day>10 )? this.modelLTo['date'].day:'0'+this.modelLTo['date'].day);
            //   var vacFrom= (this.modelVFrom['date'].year)+'-'+( (this.modelVFrom['date'].month>10 )? this.modelVFrom['date'].month:'0'+this.modelVFrom['date'].month) +'-'+ ((this.modelVFrom['date'].day>10 )? this.modelVFrom['date'].day:'0'+this.modelVFrom['date'].day);
            //   var vacTo= (this.modelVTo['date'].year)+'-'+( (this.modelVTo['date'].month>10 )? this.modelVTo['date'].month:'0'+this.modelVTo['date'].month) +'-'+ ((this.modelVTo['date'].day>10 )? this.modelVTo['date'].day:'0'+this.modelVTo['date'].day);
            // console.log(this.modelVFrom['date'].month);
            // console.log(this.modelVFrom['date'].day);             
                var matFrom= (this.modelMFrom['date'].year)+'-'+(this.modelMFrom['date'].month) +'-'+ (this.modelMFrom['date'].day);
                var matTo= (this.modelMTo['date'].year)+'-'+(this.modelMTo['date'].month) +'-'+ (this.modelMTo['date'].day);
                var loaFrom= (this.modelLFrom['date'].year)+'-'+(this.modelLFrom['date'].month) +'-'+ (this.modelLFrom['date'].day);
                var loaTo= (this.modelLTo['date'].year)+'-'+(this.modelLTo['date'].month) +'-'+ (this.modelLTo['date'].day);
                var vacFrom= (this.modelVFrom['date'].year)+'-'+(this.modelVFrom['date'].month) +'.'+ (this.modelVFrom['date'].day);
                var vacTo= (this.modelVTo['date'].year)+'-'+(this.modelVTo['date'].month) +'-'+ (this.modelVTo['date'].day);
                 
                var tempMFrom= new Date(matFrom);
                var tempMTo= new Date(matTo);
                var tempLFrom= new Date(loaFrom);
                var tempLTo= new Date(loaTo);
                var tempVFrom= new Date(vacFrom);
                var tempVTo= new Date(vacTo);

              if(tempMTo < tempMFrom || tempLTo < tempLFrom || tempVTo < tempVFrom){
                  this.statusMessage = 'End Date must be Greater';
                    // console.error(error);
                    matFrom=null;
                    matTo=null;
                    loaFrom=null;
                    loaTo=null;
                    vacFrom=null;
                    vacTo=null;
                    this.showDialog=true;
                    return                                    
              }
              this._Update.uploadProfile(
                    this.checkBoxMaternity,
                    //this.MaternityFrom,
                    //new Date(this.modelMFrom['jsdate']),
                    matFrom,
                    //this.MaternityTo,
                    //new Date(this.modelMTo['jsdate']),
                    matTo,
                    this.checkBoxLOA,
                    //this.LOAFrom,
                    //new Date(this.modelLFrom['jsdate']),
                    loaFrom,
                    //this.LOATo,
                    //new Date(this.modelLTo['jsdate']),
                    loaTo,
                    this.checkBoxVacation,
                    //this.VacationFrom,
                    //new Date(this.modelVFrom['jsdate']),
                    vacFrom,
                    //this.VacationTo,
                    //new Date(this.modelVTo['jsdate']),
                    vacTo,
                    this.checkBoxCrossTrain,
                    this.selectedCityId,
                    this.checkBoxRelocate,
                    this.selectedFirstPrefCityId,
                    this.selectedSecondPrefCityId,
                    this.AlternateContactNumber,
                    this.checkBoxVisa,
                    this.selectedCountryId
                ).subscribe((textData) => {
                    this.returnText = textData;
                    //console.log(this.returnText);
                    //alert('Data Inserted Successfully!');
                    this.showUpdateDialog=true;
                    setTimeout(()=>{                           
                      this.router.navigate(['/mainpage']);
                 },2000);
                },
                    (error) => {
                        this.statusMessage = 'Invalid Job Details/Session timed out';
                       // console.error(error);
                       this.showDialog=true;
                    });
            }
            else {
                alert('InputUser is Undefined');
            }           
        }    
        catch (Error) { alert('Something Went Wrong on Submit'); }
    }
//     getDate(){
// //Date = {4/20/2018 12:00:00 AM}

// var matFrom= (this.modelMFrom['date'].year)+'-'+( (this.modelMFrom['date'].month>10 )? this.modelMFrom['date'].month:'0'+this.modelMFrom['date'].month) +'-'+ ((this.modelMFrom['date'].day>10 )? this.modelMFrom['date'].day:'0'+this.modelMFrom['date'].day);
// console.log(matFrom);
//         console.log(this.modelMFrom['date']);
//       }
    
  
      fileChange(event: any) {
        try {
            
          let fileList: FileList = event.target.files;
          let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            this.fileName = file.name;
            formData.append('enterpriseId', this.inputText);  
                            
            if (fileList.length > 0) {              
                let headers = new Headers()
                // headers.append('Content-Type', 'application/json');  
                headers.append('Accept', 'application/json');
                // headers.append('Authorization',this._User.getBearerToken());
                // headers.append('Content-Type','application/json; charset=utf-8');
                let options = new RequestOptions({ headers: headers });
  
                if (this.inputText != undefined) {
                    this._Update.fileUpload(formData, options)
                        .subscribe(
                        data => {
                            //console.log(data);
                            //this.showUpdateDialog=true;
                            //alert('File Uploaded Successfully');
                            
                        },
                        (error) => {
                            this.statusMessage = 'Please Upload file again';
                            console.error(error);
                           this.showDialog=true;
                        });
                    
                }
                else {
                    alert('InputUser is Undefined');
                }
            }
            else {
                alert('No File Selected');
            }
          
        }
        catch (Error) { alert('Something Went Wrong in Uploading Profile'); }
    
    }
  }