import { Component, OnInit } from '@angular/core';

// import Message Service
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // public service because we need to bind to it in template
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
