import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IUpdateProfile,IGetUpdateProfileDetails } from './iupdate-profile';
import { UserService } from '../user/user.service';

//  import { CookieService } from 'angular2-cookie/core';


@Injectable()
export class UpdateProfileService {

    private inputText: string; // = 'garima.budhraja';

    statusMessage: string = 'Loading Data. Please Wait...';
    constructor(private _http: Http,private _User: UserService, private router: Router) {
        this.inputText=this._User.userInfo();
        // console.log(this.inputText);
        // if(this.inputText ==  undefined ){           
        //     window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        // }
    }

    updateFormData(EID:string):Observable<IGetUpdateProfileDetails[]>{
        this.inputText=this._User.userInfo();
        // console.log(this.inputText);
        //debugger;
        const urlWithUserName= this._User.getUrlString()+'Bench/GetUserLeaveDetails?EnterpriseID='+EID;
       // console.log(urlWithUserName);
       let headers = new Headers();
       //console.log(this.token);
    //    this.encodedString='Bearer '+this.userToken;
       //console.log(this._User.getBearerToken());
       headers.append('Authorization',this._User.getBearerToken());
       headers.append('Content-Type','application/json; charset=utf-8');
       //debugger;
       let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithUserName,null,options)
        .map((response:Response)=><IGetUpdateProfileDetails[]>response.json())
        .catch(this.handleError);
    }

    dropDownData(): Observable<IUpdateProfile[]> {
        this.inputText=this._User.userInfo();
        // console.log(this.inputText);
        const urlWithUserName = this._User.getUrlString()+'Bench/AllDropdownInput?TableName=CITY|COUNTRY&EnterpriseID=' + this.inputText;
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        //console.log(this._User.getBearerToken());
        //debugger;
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithUserName,null,options)
            .map((response: Response) =><IUpdateProfile[]>response.json())
            .catch(this.handleError);
    }

    fileUpload(formData: FormData, options: RequestOptions) {
        //debugger;
        //console.log(formData.get('uploadFile'));  
        this.inputText=this._User.userInfo();
         //console.log(this.inputText);
         //console.log(this._User.getUrlString());
     const urlWithFileUser= this._User.getUrlString()+'UploadFileApi/WriteFile';
     
        return this._http.post(urlWithFileUser, formData, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    uploadProfile(
        checkBoxMaternity: boolean,
        MaternityFrom: string,
        MaternityTo: string,
        checkBoxLOA: boolean,
        LOAFrom: string,
        LOATo: string,
        checkBoxVacation: boolean,
        VacationFrom: string,
        VacationTo: string,
        checkBoxCrossTrain: boolean,
        selectedCityId: number,
        checkBoxRelocate: boolean,
        selectedFirstPrefCityId: number,
        selectedSecondPrefCityId: number,
        AlternateContactNumber: string,
        checkBoxVisa: boolean,
        selectedCountryId: number
    ): Observable<IUpdateProfile[]> {
        this.inputText=this._User.userInfo();
            // console.log(this.inputText);
        const urlWithParameters = this._User.getUrlString()+'Bench/UserLeaveDetails?EnterpriseID='
            + this.inputText
            + '&Maternity=' + checkBoxMaternity
            + '&MFromdate=' + MaternityFrom
            + '&MTodate=' + MaternityTo
            + '&LOA=' + checkBoxLOA
            + '&LFromdate=' + LOAFrom
            + '&LTodate=' + LOATo
            + '&Vacation=' + checkBoxVacation
            + '&VFromdate=' + VacationFrom
            + '&VTodate=' + VacationTo
            + '&CrossTrain=' + checkBoxCrossTrain
            + '&CurrentLoc=' + selectedCityId
            + '&Relocate=' + checkBoxRelocate
            + '&Preference1=' + selectedFirstPrefCityId
            + '&Preference2=' + selectedSecondPrefCityId
            + '&AlternateCon=' + AlternateContactNumber
            + '&Visa=' + checkBoxVisa
            + '&Country=' + selectedCountryId;
            let headers = new Headers();
       //console.log(this.token);
    //    this.encodedString='Bearer '+this.userToken;
       //console.log(this._User.getBearerToken());
       headers.append('Authorization',this._User.getBearerToken());
       headers.append('Content-Type','application/json; charset=utf-8');
       
       let options = new RequestOptions({ headers: headers });
            
        return this._http.post(urlWithParameters,null,options)
            .map((response) => response.text())
            .catch(this.handleError);
    }

    handleError(error: Response) {
    //debugger;
        //console.log('1');
        this.router.navigate(['/updateNew']);
        //console.log(error);
        return Observable.throw(error);
    }

}
