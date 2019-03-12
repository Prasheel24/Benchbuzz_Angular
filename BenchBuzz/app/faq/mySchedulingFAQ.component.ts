import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import {UserService} from '../user/user.service';

@Component({
    template: `
<div class="container" style="background:lightgrey;color:black;text-align:justify">
      <div class="row" style="margin-left:0;margin-right:0;padding-top:2%"><a href="https://myscheduling.accenture.com/" target="_blank">My Scheduling Tool</a></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0">
        <p>
           	Click on Update my CV Resume ans skills. Update the details and save and exit.<br />
	        <b>Update and submit CV once after you come on ITP, if you feel your CV is already updated, then visit the site and simply re-submit.</b>
        </p>
       </div>    
    </div>
`,
styles:[
    `
    @media only screen and (min-width: 768px) {
        .container{
            width:100%;
        }           
     }
    `
]
})

export class MySchedulingFAQComponent {
    loginUser:string;
    constructor(private _User:UserService,private router:Router) { 
    //   this.loginUser=this._User.userInfo();
    //   if(this.loginUser == undefined){
    //       this.router.navigate(['\login']);
    //   }
    }
}