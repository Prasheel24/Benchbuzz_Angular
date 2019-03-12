import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,HttpModule, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IMyFavourites } from './imy-favourites';

import { UserService } from '../user/user.service';


@Injectable()
export class MyFavouritesService {

    private rrdNumber: string;

    private inputText: string; // = 'garima.budhraja';

    statusMessage: string = 'Loading Data. Please Wait...';
    constructor(private _http: Http,private _User: UserService,  private router: Router) {
        this.inputText = _User.userInfo();
        //console.log(this.inputText);
        // if(this.inputText === ( undefined || '')){           
        //     window.location.href='https://cmtindiastream.accenture.com/eMapWeb/common/BenchBuzzLoadUser';                                                           
        // }
    }

    getFavouritesStatus(isFav: boolean, isApplied: boolean): Observable<IMyFavourites[]> {
        const urlWithParameters = this._User.getUrlString()+'Bench/ApplicationStatusList?EnterpriseID=' + this.inputText
            + '&isFavourite=' + isFav + '&isApplied=' + isApplied;
        //console.log(urlWithParameters);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithParameters,null,options)
            .map((response: Response) => <IMyFavourites[]>response.json())
            .catch(this.handleError);
    }

    setRRDNumber(rrdNo: string) {
        this.rrdNumber = rrdNo;
    }

    getFavouritesStatusbyRRD(): Observable<IMyFavourites[]> {
        const urlWithRRD = this._User.getUrlString()+'bench/ApplicationStatusRRDDetails?ENTERPRISE_ID=' + this.inputText
            + '&rrd_no=' + this.rrdNumber;
        //console.log(urlWithRRD);
        let headers = new Headers();
        //console.log(this.token);
     //    this.encodedString='Bearer '+this.userToken;
        
        headers.append('Authorization',this._User.getBearerToken());
        headers.append('Content-Type','application/json; charset=utf-8');
        
        let options = new RequestOptions({ headers: headers });
        return this._http.post(urlWithRRD,null,options)
            .map((response: Response) => <IMyFavourites[]>response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
       // console.error(error);
        return Observable.throw(error);
    }

}
