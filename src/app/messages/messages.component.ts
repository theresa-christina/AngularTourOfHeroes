import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  title = 'Messages';

  /** Angular inject the singelton MessageService into messagesService property */
  /** Must be public since we're going to bind it to the template */
  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
  }

}
