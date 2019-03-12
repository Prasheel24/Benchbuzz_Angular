import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import {UserService} from '../user/user.service';

@Component({
    template: `
<div class="container" style="background:lightgrey;color:black;text-align:justify">      
      <div class="row" style="margin-left:0;margin-right:0">
        <p>                   
            <b>Reporting and Workstation</b><br />
            1.  Report to your Location Lead in person, on the day of joining AGHP<br />
            2.  In case, you have been rolled-off from a project, work with your previous project, to release your seat. Subsequently, connect with ACP POC for allocating a workstation.<br />
            
            <br /><b>Utilization and Self-Development</b><br />
            1.  Complete all mandatory trainings within a week of joining CMT AGHP. Accenture New Joiners should complete New Joiner Orientation at the earliest as per the registration.<br />
            2.  Utilize your time effectively by nominating for CMT AGHP Ops activities and remain focused on self-development.<br />
            3.  If you are supporting AGHP Ops activities (other than Staffing), do not charge more than 3-4 hours. Staffing team has to charge time as per actual.<br />
            4.  In case of issues regarding Ops activities, reach to your Activity Lead or Location Lead.<br />
            5.  Leads to be notified in advance in case of training enrollment.<br />
            6.  Delegate your responsibilities to corresponding activity backup(s), if you going on Vacation/Training or Hard Locked to a project. Failing this, your Vacations/trainings will not be approved/cancelled<br />
            
            <br /><b>Charging Time in MyTE</b><br />
            1.  Set up your AGHP Supervisors/Leads as Approvers in MyTE.<br />
            2.  AM and below levels should submit MyTE to AGHP Supervisors/Leads for approval and submission. Please check and don’t submit yourself.<br />
            3.  40% of the time on AGHP should be charged to trainings (max. 20 Hrs./Week). Failing this, MyTE will not be approved by AGHP Supervisor/Leads<br />
            4.  DO NOT share the AGHP WBS with anyone except resources supporting identified AGHP activities.<br />
            5.  AGHP Ops activity Leads to monitor usage of WBS – Usage should be strictly based on actual work done else vacation to be marked (if no work done)<br />
            6.  Ensure vacation hours are charged to Vacation WBS<br />
            7.  DO NOT charge to AGHP WBS from the day you are HL’ed to project.<br />
            
            <br /><b>Policies and Compliance</b><br />
            1.  Refrain from sharing passwords and marking ITP proxy attendance. These may result in disciplinary actions·<br />
            2.  Mark your daily attendance as advised. There is zero tolerance for non-compliance and may lead to HR/Leadership escalation.<br />
            3.  Ensure availability over all communication channels (Lync/Phone/Mail) during office hours.<br />
            4.  Ensure mail approval for leaves and set-up Out of office message. Update the Attendance POC about the same.<br />
            5.  Reply the emails you are getting from the AGHP POC’s, within stipulated timeline.<br />
            6.  In case, you are getting HL’ed to a project, inform corresponding location POCs (ACP, Attendance, Ops Activity) cc’ing Location Lead <br />  
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

export class GuidelinesFAQComponent {
    loginUser:string;
  constructor(private _User:UserService,private router:Router) { 
    // this.loginUser=this._User.userInfo();
    // if(this.loginUser == undefined){
    //     this.router.navigate(['\login']);
    // }
  }
}