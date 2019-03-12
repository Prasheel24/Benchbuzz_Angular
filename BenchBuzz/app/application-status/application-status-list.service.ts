import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IApplicationStatus } from './iapplication-status';

import { UserService } from '../user/user.service';

@Injectable()
export class ApplicationStatusListService {

    private rrdNumber: string;

    private inputText: string; 

    statusMessage: string = 'Loading Data. Please Wait...';
    constructor( private _http: Http,private _User: UserService,private router:Router) {
        //debugger;
        this.inputText = _User.userInfo();
       // console.log(this.inputText);
        // if(this.inputText === ( undefined || '')){           
        //     window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        // }
        // console.log(this.inputText);
        // try {
        //     //console.log('1');
        //    this._User.setEnterpriseId(this.inputText);
               
        //     //debugger;
        //      this._User.userData(this.inputText)
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
        // catch (Error) { alert('Something Went Wrong in Application Status'); }
    }

    getApplicationStatus(isFav:boolean,isApplied:boolean): Observable<IApplicationStatus[]> {
        const urlWithParameters = this._User.getUrlString()+'Bench/ApplicationStatusList?EnterpriseID=' + this.inputText
                                   + '&isFavourite=' + isFav + '&isApplied=' + isApplied;
    //     //console.log(urlWithParameters);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithParameters,null,options)
            .map((response: Response) => <IApplicationStatus[]>response.json())
                   .catch(this.handleError);
    }

    setRRDNumber(rrdNo: string) {
        this.rrdNumber = rrdNo;
       // console.log(this.rrdNumber);   
    }

    getApplicationStatusbyRRD(): Observable<IApplicationStatus[]> { 
        const urlWithRRD = this._User.getUrlString()+'bench/ApplicationStatusRRDDetails?ENTERPRISE_ID=' + this.inputText
            + '&rrd_no=' + this.rrdNumber;
        //console.log(urlWithRRD);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithRRD,null,options)
            .map((response: Response) => <IApplicationStatus[]>response.json())
            .catch(this.handleError);
    }  

    handleError(error: Response) {
       //console.error(error);
        return Observable.throw(error);
    }

}

