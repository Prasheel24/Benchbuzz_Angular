import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { UserService } from '../user/user.service';

//import { Popup } from 'ng2-opd-popup';
import { CookieService } from 'ngx-cookie-service';
@Component({
    templateUrl: './mainpage.component.html',
    styleUrls: ['./mainpage.component.css']

})
export class MainPageComponent{
    showDialog:boolean=false;
    public inputText: string;// = 'garima.budhraja';
    private InitEnterpriseID : string;
    private returnText:string;
loginUser:string;
    statusMessage: string = 'Loading Data. Please Wait...';

    constructor(private _User: UserService,private router: Router,private cookieService: CookieService) {
        //console.log(this._User.userInfo());
        this.inputText = this._User.userInfo();
        if(this.inputText ==  undefined ){         
            window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        }
    }
    
    navigateAssignment = function () {       
        this.router.navigate(['/findAnAssignmentSllListComponent']);
    }

    navigateCustomSearch = function () {
        this.router.navigate(['/customizedJobSearch']);
    }
    removeCookie(){
        this.cookieService.delete('BenchBuzzLoginCookie','/emapweb/benchbuzz','cmtindiastream.accenture.com');
        window.location.href='https://federation-sts.accenture.com/adfs/ls/?wa=wsignout1.0';
    }
}