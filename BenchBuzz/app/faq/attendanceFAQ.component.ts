import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import {UserService} from '../user/user.service';

@Component({
    template: `
<div class="container" style="background:lightgrey;color:black;text-align:justify">
      <div class="row" style="margin-left:0;margin-right:0;padding-top:2%">
        <p> 
            Please Mark your attendance through ITP Portal <br />
            <a href="http://itpportal.accenture.com/ITPPortal/AttendanceAction.do?method=checkAttendanceStatus" target="_blank">ITP Attendance</a>         
        </p>
      </div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0">
        <p> 
            The default password for ITP portal is itp(itp word in small case).<br />
            You will have to change portal password after first login          
        </p>
       </div>
<hr />    
<div class="row" style="margin-left:0;margin-right:0">
        <p style="color:deepskyblue"> 
            For Morning Session: From 07:00 to 09:30<br />
            For Evening Session: From 17:00 to 22:00          
        </p>
        <p style="color:red;text-align:left">
            If you have any issues in marking the attendance in portal, please write to 'ITP_Online_Attendance_Team@accenture.com'
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

export class AttendanceFAQComponent {
    loginUser:string;
  constructor(private _User:UserService,private router:Router) { 
    // this.loginUser=this._User.userInfo();
    // if(this.loginUser == undefined){
    //     this.router.navigate(['\login']);
    // }
  }
}