import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { windowCount } from 'rxjs/operators/windowCount';
import { scan } from 'rxjs/operators/scan';
import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';
import { from } from 'rxjs/observable/from';
import { merge } from 'rxjs/observable/merge';

import { ChatModule, Message, User, Action, ExecuteActionEvent, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: [ './chatbot.component.css' ]
})
export class ChatbotComponent {

  public feed: Observable<any[]>;
  title :string ='ChatBot'
    public readonly user: User = {
      id: 1
    };
  
    public readonly bot: User = {
      id: 0
    };
  
    private local: Subject<Message> = new Subject<Message>();
  
    constructor(private _User:UserService,   private svc: ChatService) {
      const hello: Message = {
        author: this.bot,
        suggestedActions: [{
          type: 'reply',
          value: 'What is the time?'
        }, {
          type: 'reply',
          value: 'What is my full name?'
        },{
          type: 'reply',
          value: 'Give count'
        }
      ],
        timestamp: new Date(),
        text: 'Hello, this is a demo bot. I do not do much, but I can count symbols!'
      };
  
      // Merge local and remote messages into a single stream
      this.feed = merge(
        from([ hello ]),
        this.local,
        this.svc.responses.pipe(
          map((response): any => ({
            author: this.bot,
            text: response
          })
        ))
      ).pipe(
        // ... and emit an array of all messages
        
        scan((acc,x) => [...acc,x], [])
      );
    }
  
    public sendMessage(e: SendMessageEvent): void {
      
      this.local.next(e.message);
  
      this.local.next({
        author: this.bot,
        typing: true
      });
  
      this.svc.submit(e.message.text);
    }
}
