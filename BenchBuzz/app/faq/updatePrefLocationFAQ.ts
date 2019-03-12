import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { UserService } from '../user/user.service';

@Component({
    template: `
<div class="container" style="background:lightgrey;color:black;text-align:justify">
      <div class="row" style="margin-left:0;margin-right:0;padding-top:2%"><a href="https://ast.accenture.com/" target="_blank">AST Tool</a></div>
<hr />
      <div class="row" style="margin-left:0;margin-right:0">
        <p>
           Under MY PROFILE=> Personal Details=>Click on next tab Additional personal details=> Expand the ‘Location Details’ and click on Modify.<br />
	       Choose the Preferred Location 1,Preferred Location 2 and  Preferred Location 3 from the drop down.<br />
	       Once chosen, click on Update the Location preferences by clicking the Update button.<br />
	       <b>Please document atleast 2 location preferences on the too different from Home base location.</b>
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

export class UpdatePrefLocationFAQComponent {
    loginUser:string;
    constructor(private _User:UserService,private router:Router) { 
    //   this.loginUser=this._User.userInfo();
    //   if(this.loginUser == undefined){
    //       this.router.navigate(['\login']);
    //   }
    }
}