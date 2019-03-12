import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
 

import { UserService } from '../user/user.service';
import {IGetUpdateProfileDetails} from '../update-profile/iupdate-profile';
import {UpdateProfileService} from '../update-profile/update-profile.service';

import { Adal4Service } from 'adal-angular4';

import { JwtHelperService } from '@auth0/angular-jwt';

const config = {
          authorizationUrl: 'https://federation-sts-stage.accenture.com/oauth/ls/connect/', //remove -stage
          clientId: '6514.cmtindiastream.ibenchbuzz.web',
          response_type: 'token',
          redirect_uri: 'http://localhost:9090/', //https://cmtindiastream.accenture.com/emapweb/benchbuzz/
          scope: 'user_profile read_cmtindiastream write_cmtindiastream',
      };  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  enterpriseId:string;
  hideLogin:boolean=true;
  hideHeader:boolean=false;
  hideServerHeader:boolean=true;
  
  updateFormData:IGetUpdateProfileDetails[];   
  isCVUploaded:boolean=false;
  statusMessage:string='Loading Data,Please Wait';
  cookieValue = 'UNKNOWN';

  token:string;
  constructor( private router: Router,private _User:UserService,   
                private _Update:UpdateProfileService,private cookieService: CookieService,private service: Adal4Service,public jwtHelper: JwtHelperService ) {       
    }
    ngOnInit() { 
      this.hideLogin=true;    
      //this.cookieService.set( 'Test', 'Hello World' );
      this.cookieValue = this.cookieService.get('BenchBuzzLoginCookie');
      //console.log(this.cookieValue);
      //console.log(this.cookieService.get('BenchBuzzLoginCookie'));
      //console.log('1');
      // if(this.cookieService.get('BenchBuzzLoginCookie').length>0){           
      //         this.enterpriseId=this.cookieValue;
      //         //console.log(this.enterpriseId);
      //        // console.log(sessionStorage.getItem('BenchBuzzLoginUser'));
      //         this.login();
      //        // console.log('2');
      //   }
      // else{
      //   // //comment this line before deployment        
      //   //console.log(sessionStorage.getItem('BenchBuzzLoginUser'));

      //     //this.enterpriseId='pampapathi.bojugu';
      //     //this._User.setEnterpriseId(this.enterpriseId);   
      //     //this.login();
      //          // //uncomment this line before deployment
      //   window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
      //   //window.location.href='https://emap.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                               
      // }
      //console.log(location.href);
      this.service.init(config);
      var tokenURL = location.href.toString();
      //console.log(tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')))    ;
    if(tokenURL ==='http://localhost:9090/'){
      if (!this.service.userInfo.authenticated) {
        this.service.login();
        this.service.userInfo.authenticated=true;
        sessionStorage.setItem('token',tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
        this.cookieService.set('token',tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
        this._User.setUserToken(tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
      }
    }
    else if(tokenURL ==='https://cmtindiastream.accenture.com/emapweb/benchbuzz/'){
      if (!this.service.userInfo.authenticated) {
        this.service.login();
        this.service.userInfo.authenticated=true;
        sessionStorage.setItem('token',tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
        this.cookieService.set('token',tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
        this._User.setUserToken(tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
      }
    }
    else {
      if(sessionStorage.getItem('token') || this.cookieService.get('token')){
      this.token=tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&'))? tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')):sessionStorage.getItem('token');
      //console.log(this.jwtHelper.decodeToken(tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&'))));
      var decodedToken=this.jwtHelper.decodeToken(this.token);
        //console.log(decodedToken);
           // console.log(decodedToken['samaccount_name']);
            this.enterpriseId=decodedToken['samaccount_name'];
             var userName= decodedToken['given_name'] +' '+ decodedToken['sn'];
             this._User.setUserName(userName);
            this._User.setUserToken(tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));         
            this._User.setEnterpriseId(this.enterpriseId); 
            this.login();         
           
     return          
      }
      else {
        if (!this.service.userInfo.authenticated) {
          this.service.login();
          this.service.userInfo.authenticated=true;
          sessionStorage.setItem('token',tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
          this._User.setUserToken(tokenURL.substring(tokenURL.search('=')+1,tokenURL.search('&')));
          
        }
      }
    }
    }
    login() {       
      var EID=this.enterpriseId;
      console.log(EID);
     // console.log('5');
    // debugger;
      this.hideLogin=false;
          // this._User.userData(EID)
          //       .subscribe((userData) => {    
          //         debugger;              
          //           if (userData.length > 0) {
          //               if (userData.find(x => x.RoleValue === 1)) {
          //                 this._User.setEnterpriseId(this.enterpriseId);   
          //                 this.hideHeader=true;                       
          //                 this.redirectMainPage();  
          //               }
          //               else if (userData.find(x => x.RoleValue === 2)) {
          //                 this._User.setEnterpriseId(this.enterpriseId);
          //                 this.hideHeader=true;                       
          //                   this.redirectMainPage();  
          //               }
          //               else if (userData.find(x => x.RoleValue === 3)) {
          //                   //debugger;                           
          //                   this._User.setEnterpriseId(this.enterpriseId);
          //                   this.hideHeader=true;                     
          //                   this.redirectMainPage(); 
          //               }
          //               else if (userData.find(x => x.RoleValue === 4)) {  
          //                 this.hideLogin=false;                                  
          //                 this.router.navigate(['/noaccess']);
          //               }
          //           }
          //           else { 
          //               alert('Something Went Wrong');
          //           }
          //       },
          //       (error) => {
          //         this.hideLogin=false;   
          //         this.router.navigate(['/serverDown']);
          //       });
         this._User.userProfileData(EID)
         .subscribe((userProfData)=> {
          //debugger;   
          if (userProfData.length > 0) {
            if (userProfData.find(x => x.RoleValue === 1)) {
              this._User.setEnterpriseId(this.enterpriseId);   
              this.hideHeader=true;    

           if(userProfData.find(x=> x.IsProfileUpdated == true)){
                this.router.navigate(['/mainpage']);
              } 
              else {
                this.hideLogin=false; 
                this.hideHeader=false;
                this.router.navigate(['/updateNew']);
              }                              
            }
            else if (userProfData.find(x => x.RoleValue === 2)) {
              this._User.setEnterpriseId(this.enterpriseId);
              this.hideHeader=true;                       
              //  this.redirectMainPage();  
              if(userProfData.find(x=> x.IsProfileUpdated == true)){
                this.router.navigate(['/mainpage']);
              } 
              else {
                this.hideLogin=false; 
                this.hideHeader=false;
                this.router.navigate(['/updateNew']);
              } 
            }
            else if (userProfData.find(x => x.RoleValue === 3)) {                                           
                this._User.setEnterpriseId(this.enterpriseId);
                this.hideHeader=true;                     
                //this.redirectMainPage(); 
                if(userProfData.find(x=> x.IsProfileUpdated == true)){
                  this.router.navigate(['/mainpage']);
                } 
                else {
                  this.hideLogin=false; 
                  this.hideHeader=false;
                  this.router.navigate(['/updateNew']);
                } 
            }
            else if (userProfData.find(x => x.RoleValue === 4)) {  
              this.hideLogin=false;                                  
              this.router.navigate(['/noaccess']);
            }
        }
        else { 
            alert('Something Went Wrong');
        }
         },
          (error) => {
            this.hideLogin=false;   
            this.router.navigate(['/serverDown']);          
         });
    }
    // redirectMainPage(){
    //   this._Update.updateFormData(this.enterpriseId).subscribe((updateDetails)=>{        
    //       this.updateFormData=updateDetails['Data'];
    //       //debugger;
    //       for(var temp in this.updateFormData[0]){
    //         this.isCVUploaded=this.updateFormData[0].IsCV_Uploaded;       
    //       }
    //       if(this.isCVUploaded==true){
    //         this.hideLogin=false; 
    //         this.router.navigate(['/mainpage']);
    //       }
    //       else{
    //         this.hideLogin=false; 
    //         this.router.navigate(['/update']); 
    //       }
    //   },
    //   (error) => {
    //       this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
    //       //alert(this.statusMessage);
    //       //console.log('inside login error');
    //       this.hideLogin=false; 
    //       this.hideHeader=false;
    //       this.router.navigate(['/updateNew']);
    //   });
    // }
    showHeader(){
      this.hideHeader=true;
    }
    keyDownFunction(event:any) {
      if(event.keyCode == 13) {
       this.login();
      }
    }
}
