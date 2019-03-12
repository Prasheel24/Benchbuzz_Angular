
import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,HttpModule, Response,RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { IFindAnAssignmentSllList } from './ifind-an-assignment-sll-list';
import { UserService } from '../user/user.service';

@Injectable()
export class FindAnAssignmentSllListService {
    
    private inputText: string;// ='garima.budhraja';
        
    statusMessage: string = 'Loading Data. Please Wait...';

    constructor(private _http: Http,private _User: UserService,  private router: Router) {
        //console.log(this._User.userInfo());
        //debugger;
        this.inputText = this._User.userInfo();
        //console.log(this.inputText);
        // if(this.inputText === ( undefined || '')){           
        //     window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        // }
    //    this.config = _configService.getConfig();
        // try {
            ////console.log('1');
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

    findAnAssignmentSllList(): Observable<IFindAnAssignmentSllList[]> {
       
        const urlWithUserName = this._User.getUrlString()+'Bench/FindAnAssignmentSLLList?ENTERPRISEID=' + this.inputText;    
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithUserName,null,options)
            .map((response: Response) => <IFindAnAssignmentSllList[]>response.json())
            .catch(this.handleError);     
        
    }
    handleError(error: Response) {
        //console.error(error);
        return Observable.throw(error);
    }
}