import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IFindAnAssignmentSllList } from './ifind-an-assignment-sll-list';
import { UserService } from '../user/user.service';

@Injectable()
export class DetailDescriptionRRDService {

   // customSearchData: ICustomData[];

    findAnAssignmentData: IFindAnAssignmentSllList[];

    //public tempData: Observable<ICustomData[]>;

    private inputText: string;

    private tempData: Observable<IFindAnAssignmentSllList[]>;

    statusMessage: string = 'Loading Data. Please Wait...';

    constructor(private _http: Http, private _User: UserService, private router: Router) {
        //console.log(_User.userInfo());
        
        this.inputText = _User.userInfo();
       // console.log(this.inputText);
     
        
    }
    getDetailDescriptionDataByRRD(tempRRD:string): Observable<IFindAnAssignmentSllList[]> {
        this.inputText = this._User.userInfo();
        if(this.inputText!= (undefined || null)){
            
        const urlWithParameters = this._User.getUrlString()+'bench/RetrieveByRRD?EnterpriseID='
                                  + this.inputText + '&RrdNo=' + tempRRD;   
        //console.log(urlWithParameters);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        //console.log(this._User.getBearerToken());
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        this.tempData = this._http.post(urlWithParameters,null,options)
            .map((response: Response) => <IFindAnAssignmentSllList[]>response.json())
            .catch(this.handleError);
        return this.tempData;
        }        
    }
    applyForAssignment(selectedRRD: string, isApplied: boolean, isFavourite: boolean): Observable<IFindAnAssignmentSllList[]> {
        this.inputText = this._User.userInfo();
        if(this.inputText!= (undefined || null)){
        const urlWithParameters = this._User.getUrlString()+'Bench/QuickApply?EnterpriseID='
            + this.inputText + '&RRDNumber=' + selectedRRD + '&isFavourite=' + isFavourite + '&isApplied=' + isApplied;
        //console.log(urlWithParameters);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        //console.log(this._User.getBearerToken());
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithParameters,null,options)
            .map((response: Response) => response.text())
            .catch(this.handleError);
        }
    }
    applyFavourite(selectedRRD: string, isApplied: boolean, isFavourite: boolean): Observable<IFindAnAssignmentSllList[]> {
        this.inputText = this._User.userInfo();
        if(this.inputText!= (undefined || null)){
        const urlWithParameters = this._User.getUrlString()+'Bench/QuickApply?EnterpriseID='
            + this.inputText + '&RRDNumber=' + selectedRRD + '&isFavourite=' + isFavourite + '&isApplied=' + isApplied;
        //console.log(urlWithParameters);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        //console.log(this._User.getBearerToken());
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithParameters,null,options)
            .map((response: Response) => response.text())
            .catch(this.handleError);
        }
    }
  
    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
