import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
// Mock remote service

@Injectable()
export class ChatService {
  public readonly responses: Subject<string> = new Subject<string>();
  constructor(private _User:UserService){}
  public submit(question: string): void {
    const length = question.length;
    const fullName= this._User.getUserName();
    const time= new Date();

    if(question.includes('full name')){
      const answer=`As per our records, your full name is ${fullName}`;
      setTimeout(
        () => this.responses.next(answer),
        1000
      );
      return;
    }
    if(question.includes('time')){
      const answer=`Current time is ${time.toTimeString()}`;
      setTimeout(
        () => this.responses.next(answer),
        1000
      );
      return;
    }
    const answer = `"${question}" contains exactly ${length} symbols.`;

    setTimeout(
      () => this.responses.next(answer),
      1000
    );
  }
}