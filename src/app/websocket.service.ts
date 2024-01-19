import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: any;

  constructor() { this.initConnectionSocket() }

  initConnectionSocket() {
    const url = '//localhost:8080/ws';
    const wsUrl = `${environment.apiUrl}/ws`;
    const socket = new SockJS(wsUrl);
    this.stompClient = Stomp.over(socket);
  }

  getFrame(): void {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe(`/topic/getVideo`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        console.log("Recieved message: " + messageContent.content);
      })
    })
  }

  requestVideo(roomId: string) {
    this.stompClient.send(`/app/requestVideo/${roomId}`);
  }

}