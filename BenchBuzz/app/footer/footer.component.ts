import { Component } from '@angular/core';
import { Routes, Router, RouterModule } from "@angular/router";

import { IUser } from '../user/user';
import { UserService } from '../user/user.service';
@Component({
    selector: 'footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent {
    inputText: string;
    showFooter: boolean = true;
    constructor(private _User:UserService,private router: Router) {
        this.inputText = _User.userInfo();
        try {
            // //console.log('1');
            // this._User.setEnterpriseId(this.inputText);
            // // console.log(this.inputText);    
            // // debugger;
            // this._User.userData(this.inputText)
            //     .subscribe((userData) => {
            //         //console.log('2');
            //         if (userData.length > 0) {
            //             if (userData.find(x => x.RoleValue === 1)) {
            //                 //console.log('1');
            //             }
            //             else if (userData.find(x => x.RoleValue === 2)) {
            //                 //console.log('2');
            //             }
            //             else if (userData.find(x => x.RoleValue === 3)) {
            //                 //console.log('3');
            //             }
            //             else {
            //                 //  console.log('4');
            //                 this.showFooter = false;
            //                 this.router.navigate(['/noaccess']);
            //             }
            //         }
            //         else {
            //             // console.log('5');
            //             alert('Something Went Wrong');
            //         }

            //     },
            //     (error) => {
            //         //this.statusMessage = 'Problem with the Service, Please Try Again after Sometime';
            //         this.showFooter = false;
            //         this.router.navigate(['/serverDown']);
            //         //console.error(error);
            //     });
        }
        catch (Error) { alert('Something Went Wrong in MainPage'); }
    }

  
}