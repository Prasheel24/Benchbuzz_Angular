import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FormArray } from '@angular/forms';

import { ICustomisedJobSearch, ICustomData } from './icustomised-job-search';
import { IFindAnAssignmentSllList } from '../AssignmentDetails/ifind-an-assignment-sll-list';
import { IApplicationStatus } from '../application-status/iapplication-status';
import { IMyFavourites } from '../my-favourites/imy-favourites';


import { UserService } from '../user/user.service';
import { CustomizedJobSearchComponent } from './customised-job-search.component';

@Injectable()
export class CommonService {

    customSearchData: ICustomData[];

    findAnAssignmentData: IFindAnAssignmentSllList[];

    public applicationData: IApplicationStatus[];

    public favouritesData: IMyFavourites[];

    public flagFindAssignment: boolean = false;

    //tempApplicationData1: IApplicationStatus[];

    //tempApplicationData2: IApplicationStatus[];

    //tempFavouritesData1: IMyFavourites[];

    //tempFavouritesData2: IMyFavourites[];

    public tempData: Observable<ICustomData[]>;

    private inputText: string;

    public rrdNumber: string;

    statusMessage: string = 'Loading Data. Please Wait...';

    constructor(private _http: Http,private _User: UserService) {
        //debugger;
       // console.log(_User.userInfo());
        this.inputText = _User.userInfo();
        //console.log(this.inputText);
        // if(this.inputText === ( undefined || '')){           
        //     window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        // }

    }

    customizedJobSearch(selectedCityId: number, selectedLevelId: number, selectedClusterId: number, selectedSkillId: number[]): Observable<ICustomData[]> {
        
        if (selectedSkillId) { 
            this.inputText = this._User.userInfo();    
        const urlWithParameters = this._User.getUrlString()+'Bench/CustomizeJobSearch?ENTERPRISEID='
            + this.inputText + '&LOCATIONID=' + selectedCityId + '&LEVELID=' + selectedLevelId + '&SKILLID=' + selectedSkillId + '&CLUSTERID=' + selectedClusterId;
            let headers = new Headers();
            //console.log(this.token);
         //    this.encodedString='Bearer '+this.userToken;
            
            headers.append('Authorization',this._User.getBearerToken());
            headers.append('Content-Type','application/json; charset=utf-8');
            
            let options = new RequestOptions({ headers: headers });
            this.tempData = this._http.post(urlWithParameters,null,options)
            .map(this.searchData)
                .catch(this.handleError);
        }
        //console.log(this.tempData);
        return this.tempData;
    }

    public searchData(response: Response): ICustomData[] {
        let data = response.json();
        const result: ICustomData[] = [];
        if (!data) {
            return result;
        }
        const arrayLength = data.length;
        for (let i = 0; i <= arrayLength; i++) {
            const item = data[i];
            if (item) {
                result.push({
                    AssignedRole: item.AssignedRole,
                    PocName: item.PocName,
                    DemandDetails: item.DemandDetails,
                    CreatedDate: item.CreatedDate,
                    ClientName: item.ClientName,
                    SkillName: item.SkillName,
                    RRDNumber: item.RRDNumber,
                    RRDCount: item.RRDCount,
                    ReqdBy: item.ReqdBy,
                    Location: item.Location,
                    Facility: item.Facility,
                    CareerLevel: item.CareerLevel,
                    ApplicationStatus: item.ApplicationStatus,
                    RejectionStatus: item.RejectionStatus
                });
            }
        }
        this.customSearchData = result;
        //console.log(this.customSearchData);
        return result;
    }

    //private config = {};

    //setOption(option:any, value:number) {
    //    this.config[option] = value;
    //}

    //getConfig() {
    //    return this.config;
    //}

    setRRDNumber(rrdNo: string) {
        this.rrdNumber = rrdNo;
        //console.log(this.rrdNumber);
    }
    getRRDNumber() {
        //console.log(this.rrdNumber);
        return this.rrdNumber;
    }

    setData(temp: ICustomData[]) {
        this.customSearchData = temp;
        //console.log(temp);
    }
    getData() {
       //this.flagFindAssignment=true;
        //console.log(this.customSearchData);
        return this.customSearchData;
    }

    setAssignmentData(temp: IFindAnAssignmentSllList[]) {
        this.findAnAssignmentData = temp;
    }
    getAssignmentData() {
     //   console.log(this.findAnAssignmentData);
        return this.findAnAssignmentData;        
    }

    setApplicationData(temp: IApplicationStatus[]) {
        this.applicationData = temp;
        
        //console.log(this.applicationData);
    }
    getApplicationData() {
        //console.log(this.applicationData);
        // this.favouritesData=[];
        // this.findAnAssignmentData=[];
        return this.applicationData;
    }

    setApplicationDataByRRD(temp: IApplicationStatus[], selectedRRD: string) {
        this.applicationData = temp;
        //this.rrdNumber = selectedRRD;
        //console.log(this.applicationData);

        this.setRRDNumber(selectedRRD);
    }
    getApplicationDataByRRD() {
        this.getRRDNumber();
        this.flagFindAssignment=false;
        //console.log(this.getRRDNumber());
        //console.log(this.applicationData)
        // this.favouritesData=[];
        // this.findAnAssignmentData=[];
        return this.applicationData;
    }
setFlagAssignment(){
    this.flagFindAssignment=!this.flagFindAssignment;
}

    setFavouritesData(temp: IMyFavourites[]) {
        this.favouritesData = temp;
    }
    getFavouritesData() {
        // this.applicationData=[];
        // this.findAnAssignmentData=[];
        return this.favouritesData;
    }

    setFavouritesDataByRRD(temp: IMyFavourites[], selectedRRD: string) {
        this.favouritesData=temp;
        //console.log(this.favouritesData);
        //this.rrdNumber = selectedRRD;
        this.setRRDNumber(selectedRRD);        
    }
    getFavouritesDataByRRD() {
        this.getRRDNumber();
        this.flagFindAssignment=!this.flagFindAssignment;
        // this.findAnAssignmentData=[];
        // this.applicationData=[];
        //console.log(this.getRRDNumber());
        //console.log(this.favouritesData);
        return this.favouritesData;
    }

    //setFlagFindAssignment(flag: boolean) {
    //    this.flagFindAssignment = flag;
    //}

    getFlagFindAssignment() {
         return this.flagFindAssignment;
    }

    handleError(error: Response) {
        //console.error(error);
        return Observable.throw(error);
    }
}