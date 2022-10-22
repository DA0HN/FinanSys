import { Component, Input, OnInit } from '@angular/core';
import { Required } from '@finan$ys/shared/decorators';

@Component({
  selector: 'app-server-error-message',
  templateUrl: './server-error-message.component.html',
  styleUrls: ['./server-error-message.component.css']
})
export class ServerErrorMessageComponent implements OnInit {

  @Input('messages') serverErrorMessages: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
