import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";


@Component({
  selector: 'app-server-down-page',
  templateUrl: './server-down-page.component.html',
  styleUrls: ['./server-down-page.component.css']
})

export class ServerDownPageComponent implements OnInit{
    // constructor(private router: Router) { }

    ngOnInit() {

        // setTimeout((router: Router) => {
        //     this.router.navigate(['mainpage']);
        // }, 10000); 
    }

}