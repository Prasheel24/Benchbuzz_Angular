import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import {UserService} from '../user/user.service';

@Component({
    template: `
<div class="container" style="background:lightgrey;color:black;text-align:justify">
      <div class="row" style="margin-left:0;margin-right:0;padding-top:2%"><a href="https://myrequests.accenture.com/" target="_blank">My Requests</a></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0"><p>1. Under personal information = Click Change Personal phone number.</p></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0"><a href="https://people.accenture.com/" target="_blank">People Accenture</a></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0"><p>2. Home => Go to Quick links in the left => Click on Edit my profile => Click Contacts= Mobile=> Savechanges</p></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0"><a href="https://ast.accenture.com/" target="_blank">AST Tool</a></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0"><p>3. Under MY PROFILE=> Personal Details=> Click on next tab Additional Personal Details=> Expand the  ‘Mobile Number’ and click on modify biutton. It will be redirected to  people.accenture page. Please proceed as in above step 2.</p></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0"><p><b>If the personal contact number is correct - still continue to save and submit the record. Please ensure you update this regularly on a gap of 1 month.</b></p></div>

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

export class UpdateContactFAQComponent {
      loginUser:string;
      constructor(private _User:UserService,private router:Router) { 
      //   this.loginUser=this._User.userInfo();
      //   if(this.loginUser == undefined){
      //       this.router.navigate(['\login']);
      //   }
      }
}