// import { Injectable, OnInit } from '@angular/core';
import { IUser } from './user';
// import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Component, OnInit,Injectable } from '@angular/core';
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService implements OnInit{

    private inputText: string;//= 'garima.budhraja';    
    private activeFlag: boolean = true;
    private deviceName: string;
    roleValue:number;

    statusMessage: string = 'Loading Data. Please Wait...';
    cookieValue = 'UNKNOWN';
    
    urlString:string='http://localhost:50545/'; //https://cmtindiastream.accenture.com/apistaging/

    userToken:string;
    userName:string;
    bearerString:string;

    constructor(private _http: Http, private router: Router,private cookieService: CookieService) {       
    }
  ngOnInit(){
    // this.cookieService.set( 'Test', 'Hello World' );
    this.cookieValue = this.cookieService.get('BenchBuzzLoginCookie');
//     if(this.cookieService.get('BenchBuzzLoginCookie').length>0){           
//             this.inputText=this.cookieService.get('BenchBuzzLoginCookie');
//        // console.log(this.inputText);
//        // console.log(sessionStorage.getItem('BenchBuzzLoginUser'));
//       }
//     else{
//         //console.log('4');
// //comment this line before deployment
// //console.log(sessionStorage.getItem('BenchBuzzLoginUser'));

//         //this.inputText='pampapathi.bojugu';
//        // //uncomment this line before deployment
//        window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                           
//        //window.location.href='https://emap.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                          
//         }
        
  } 
  getUrlString():string{
      return this.urlString;
  }

  setUserToken(token:string){
      
      this.userToken=token? token:sessionStorage.getItem('token');
//console.log(this.userToken);
  }

  getUserToken():string{
      return this.userToken;
  }

  getBearerToken():string{
      
      this.bearerString= 'Bearer '+ (this.userToken? this.userToken:sessionStorage.getItem('token'));
      //console.log(this.bearerString);
      if(this.bearerString=== (undefined || null || '' || 'Bearer ') ){
        window.location.href='https://cmtindiastream.accenture.com/emapweb/benchbuzz/';
      }
    return this.bearerString;
  }
    userData(login_Id: string): Observable<IUser[]> {
        const urlWithUserName = this.getUrlString()+'Bench/UserStatus?EnterpriseID=' + login_Id;
       this.setEnterpriseId(login_Id);        
       let headers = new Headers();
       
       //console.log(this.userToken);
        this.bearerString='Bearer '+this.userToken;
    
       headers.append('Authorization',this.bearerString);
       headers.append('Content-Type','application/json; charset=utf-8');
      // console.log(headers);
       let options = new RequestOptions({ headers: headers });
       return this._http.post(urlWithUserName,null,options)
            .map((response: Response) =><IUser[]>response.json())
            .catch (this.handleError);             
    }

    userProfileData(login_Id: string): Observable<IUser[]> {
        const urlWithUserName = this.getUrlString()+'Bench/UserType?EnterpriseID=' + login_Id;
       this.setEnterpriseId(login_Id);        
       let headers = new Headers();
       
       //console.log(this.userToken);
        this.bearerString='Bearer '+this.userToken;
    
       headers.append('Authorization',this.bearerString);
       headers.append('Content-Type','application/json; charset=utf-8');
      // console.log(headers);
       let options = new RequestOptions({ headers: headers });
       return this._http.get(urlWithUserName,options)
            .map((response: Response) =><IUser[]>response.json())
            .catch (this.handleError);             
    }
   
    setEnterpriseId(login_Id: string) {
       this.inputText=login_Id;
    }

    userInfo(): string {         
        return this.inputText;
    }

    getNotifications(): Observable<IUser[]> {
        const urlWithParameters = this.getUrlString()+'Bench/BenchNotification?EnterpriseID=' + this.inputText + '&IsActive=' + this.activeFlag;
       //console.log(urlWithParameters);
       let headers = new Headers();
       //console.log(this.token);
    //    this.encodedString='Bearer '+this.userToken;
       headers.append('Authorization',this.bearerString);
       headers.append('Content-Type','application/json; charset=utf-8');
       
       let options = new RequestOptions({ headers: headers });
        return this._http.get(urlWithParameters)
            .map((response: Response) => <IUser[]>response.json())
            .catch(this.handleError);
    }
    upsertUserDevice(): Observable<string> {
        this.deviceName='Angular'
        const urlWithParameters = this.getUrlString()+'Bench/BenchUserDevice?EnterpriseID=' + this.inputText + '&Device=' + this.deviceName;
       //console.log(urlWithParameters);
       let headers = new Headers();
       //console.log(this.token);
    //    this.encodedString='Bearer '+this.userToken;
       headers.append('Authorization',this.bearerString);
       headers.append('Content-Type','application/json; charset=utf-8');
       
       let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithParameters,null,options)
            .map((response: Response) => <IUser[]>response.json())
            .catch(this.handleError);
    }
    getUserName():string{
        return this.userName;
    }
    setUserName(Name:string){
        this.userName=Name;
    }
    handleError(error: Response) {

        //alert('Something Went Wrong in Setting Enterprise Id');
        //console.log(error);
        return Observable.throw(error);
    }
}
