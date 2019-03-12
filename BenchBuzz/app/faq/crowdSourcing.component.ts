import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import {UserService} from '../user/user.service';

@Component({
    template: `
<div class="container" style="background:lightgrey;color:black;text-align:justify">
      <div class="row" style="margin-left:0;margin-right:0;padding-top:2%"><a href="https://crowdsourcing.accenture.com/" target="_blank">Crowd Sourcing Accenture</a></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0">
        <p>          
            <b>Accenture Technology Talent Source</b><br />
            Utilize “<b>Accenture Technology Talent Source</b>” tool and implement crowdsourcing for CMT projects to<br />
            1.Improve on productivity<br />
            2.Provide innovations and name adds to customers with optimal utilization of the Internal Talent Pool
            resources bandwidth based on their skillset and availability<br /><br />
            
            <b>Benefits</b><br />
            •  Optimize ITP resource utilization<br />
            •  Access to Talent (SMEs/Experts) outside the project team<br />
            •  Ability to scale up/down team to take on ad-hoc tasks<br />
            •  Generate innovations and best of kind ideas<br />
            •  Cost Reduction (when client deliverables are Crowdsourced)<br /> <br />
            
            <b>Main Features</b><br />
            Ability to<br />
            
            •  Post both Challenges and Work Requests (Chargeable)<br />
            •  Pick/match work based on skill, location, size of work<br />
            •  Project & Resource dashboards<br />
            •  Provision to Score/rate deliverables<br />
            •  Select resource based on past deliverables<br />
            •  Lync based collaboration<br />
            •  Outlook integration to schedule meetings/reviews<br />
            •  Email notifications to take necessary actions.<br />
            •  Leaderboards & Scores to encourage desired delivery behaviors<br />
            •  Single system to track Crowdsourced work across ITP<br />
            •  Aligned to DMS Delivery Portfolio<br />
            •  Secure CIO Standard environment<br />
            •  Analytics support for PMs<br />
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

export class CrowdSourcingFAQComponent {
    loginUser:string;
  constructor(private _User:UserService,private router:Router) { 
    // this.loginUser=this._User.userInfo();
    // if(this.loginUser == undefined){
    //     this.router.navigate(['\login']);
    // }
  }
}