import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs'
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: any;
  frame: Subject<string | undefined> = new Subject<string | undefined>();

  constructor() { this.initConnectionSocket() }

  initConnectionSocket() {
    const wsUrl = `${environment.apiUrl}/ws`;
    const socket = new SockJS(wsUrl);
    this.stompClient = Stomp.over(socket);
  }

  getFrames(): void {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/getVideo`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        this.frame.next(messageContent.data);
      });
    });
  }

  requestVideo(roomId: string) {
    this.stompClient.send(`/app/requestVideo/${roomId}`);
  }

  getFrame(): Subject<string | undefined> {
    return this.frame;
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
    }
  }

}