import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
loginUser:string;
  constructor(private router:Router) { 
    // this.loginUser=this._User.userInfo();
    // if(this.loginUser == undefined){
    //     this.router.navigate(['\login']);
    // }
  }

  ngOnInit() {
  }

}
