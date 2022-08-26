import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';


import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  backButton?: boolean;
  faArrowLeft = faArrowLeft;

  constructor(private _router: Router) {
    this._router.events.subscribe((url: any) => {
      if(url instanceof ResolveEnd) {
          url.url === '/information' ? this.backButton = true : this.backButton = false;
      }
    });
  }

  ngOnInit(): void {}
  

}
