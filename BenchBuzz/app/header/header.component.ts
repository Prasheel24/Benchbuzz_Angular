import { Component,OnInit } from '@angular/core';
import { Routes, Router, RouterModule,NavigationStart } from "@angular/router";
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var $:any;

import { IUser,INotification } from '../user/user';
import { UserService } from '../user/user.service';


@Component({
    selector: 'header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit{
    showDialog = false;
    showNotification:boolean=true;
    showHomeRight:boolean=false;
    showHomeLeft:boolean=false;    
    showBack:boolean=false;
    seenNotification:boolean=true;
    notifications: INotification[];
    activeFlag: boolean = true;
    inputText: string;
    showHeader: boolean = true;
    loginUser:string;
    notificationLength:number;
    private returnText:string;    
    private statusMessage: string = 'Loading Data. Please Wait...';

    constructor(private _http: Http,private _User: UserService, private router: Router) {
        this.inputText = _User.userInfo();
        // this.loginUser=this._User.userInfo();
        // if(this.loginUser == undefined){
        //     this.router.navigate(['\login']);
        // }
        router.events.subscribe((value: NavigationStart) => {
if(value instanceof NavigationStart) {
    if(value.url != '/mainpage'){        
        this.showHomeRight=true;
        this.showNotification=false;
         this.showBack=true;     
       
    }    

    else{
        this.showHomeRight=false;
        this.showBack=false;
        this.showNotification=true;
        this.showHomeLeft=true;
    }
}
});

    }
    ngOnInit() {
        this.getNotifications().subscribe(
            (notificationData) => {
                this.notifications = notificationData;
                this.notificationLength=this.notifications.length;

                //console.log(this.notifications);
            },
            (error) => {
                this.notifications=[];   //MsgNotification NotificationID NotificationColor
                var emptyNoti:INotification={
                    MsgNotification:'No Notifications to Display',
                    NotificationID:1,
                    NotificationColor:'blue'                    
                   };
                   //console.log(emptyNoti);
                   //console.log(this.notifications);
                   this.notifications[0]=emptyNoti;

               //alert('Problem with the service');
            });     
            try {            
                this._User.upsertUserDevice()
                    .subscribe((textData) => {
                        this.returnText = textData;
                    },
                    (error) => {
                        this.statusMessage = 'Problem with the Service,Invalid Details';
                        //console.error(error);
                    });
            }
            catch (Error) { alert('Something Went Wrong in Main Page'); }    
    }
    backClicked() {
        window.history.back();
    }

    closeNotification(){
        this.showDialog = !(this.showDialog);
        this.seenNotification=false;
    };
    getNotifications(): Observable<INotification[]> {
        const urlWithParameters = this._User.getUrlString()+'Bench/BenchNotification?EnterpriseID=' + this._User.userInfo() + '&IsActive=' + this.activeFlag;
        //console.log(urlWithParameters);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        //console.log(this._User.getBearerToken());
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithParameters,null,options)
            .map((response: Response) => <INotification[]>response.json())
            .catch(this.handleError);
    }
    navigateMainPage() {
        this.router.navigate(['\mainpage']);
    }
    handleError(error: Response) {
        
        //this.inputText = 'prasheel.renkuntla';
        //alert('Something Went Wrong in Setting Enterprise Id');
        return Observable.throw(error);
    }
}