import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  applicationName: any = environment.applicationName;

  constructor() { }

  ngOnInit(): void {
  }

}
