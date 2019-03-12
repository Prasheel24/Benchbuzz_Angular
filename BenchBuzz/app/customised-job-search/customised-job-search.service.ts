import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ICustomisedJobSearch, ICustomData } from './icustomised-job-search';

import { UserService } from '../user/user.service';

@Injectable()
export class CustomisedJobSearchService {

    private inputText: string; // = 'garima.budhraja';

    statusMessage: string = 'Loading Data. Please Wait...';
    constructor(private _http: Http,private _User: UserService,  private router: Router) {
        
        this.inputText = _User.userInfo();
        //console.log(this.inputText);
        // if(this.inputText === ( undefined || '')){           
        //     window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        // }
    }

    dropDownData(): Observable<ICustomisedJobSearch[]> {
        const urlWithUserName = this._User.getUrlString()+'bench/AllDropdownInput?TableName=SKILL|CITY|LEVEL|CLUSTER&EnterpriseID=' + this.inputText;

        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithUserName,null,options)
            .map((response: Response) => <ICustomisedJobSearch[]>response.json())
            .catch(this.handleError);
    }


    handleError(error: Response) {
        //console.error(error);
        return Observable.throw(error);
    }
   
}
