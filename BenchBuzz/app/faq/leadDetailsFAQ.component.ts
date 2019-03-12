import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import {UserService} from '../user/user.service';

@Component({
    template: `
    <div class="container" style="background:lightgrey;color:black;text-align:justify">
    <div class="row" style="margin-left:0;margin-right:0;padding-top:2%;font-size:90%">
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
            <p>DU Lead</p>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold">
            <p>kavitha.t.bangalore@accenture.com</p>
      </div>

    </div>

    <div class="row" style="margin-left:0;margin-right:0;font-size:90%">  
         <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
               <p>HR Rep</p>
         </div>
         <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold">
            <p>yeshwanth.c.kumar@accenture.com</p>
      </div>      
    </div>

   <div class="row"  style="background-color:#199d99;text-align:center;">
              <div id="location" class="col-sm-12 col-md-12 col-lg-12"><label style="color:white;padding:2%">Location Leads</label></div>
   </div>

    <div class="row" style="margin-left:0;margin-right:0;padding-top:2%;font-size:90%">   
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
            <p>Chennai/Kolkata</p>
      </div> 
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold;font-size:90%">
            <p>karthick.rajendran@accenture.com</p>
      </div>    
    </div>

    <div class="row" style="margin-left:0;margin-right:0;font-size:90%">        
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
            <p>Bangalore</p>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold;font-size:90%">
            <p>neethan.a.ganapathy@accenture.com</p>
      </div>
    </div>

    <div class="row" style="margin-left:0;margin-right:0;font-size:90%">        
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
            <p>Pune/Mumbai</p>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold;font-size:90%">      
            <p>lakshmi.ghadi@accenture.com</p>
      </div>
    </div>

    <div class="row" style="margin-left:0;margin-right:0;font-size:90%">        
         <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
               <p>Hyderabad</p>
         </div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold;font-size:90%">
            <p>anuradha.pandey@accenture.com</p>
      </div>
     </div>

    <div class="row" style="margin-left:0;margin-right:0;font-size:90%">        
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="color:#199d99;font-weight:bold">
                <p>NCR</p>
          </div>
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8" style="color:black;font-weight:bold;font-size:90%">
            <p>deepa.suryavanshi@accenture.com</p>
      </div>
    </div>
  </div>
`,
styles:[
    `
    @media only screen and (min-width: 768px) {
          
        .container{
            width:80%;
            font-size:large;
        }           
        div#location{
              text-align:center;           
        }
     }
    `
]
})

export class LeadDetailsFAQComponent {
      loginUser:string;
      constructor(private _User:UserService,private router:Router) { 
      //   this.loginUser=this._User.userInfo();
      //   if(this.loginUser == undefined){
      //       this.router.navigate(['\login']);
      //   }
      }
}