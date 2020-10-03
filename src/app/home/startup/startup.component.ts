import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  questionAmount = '10';
  dificulty = 'easy';
  catogory = '17';

  constructor() { }

  ngOnInit(): void {
  }

}
