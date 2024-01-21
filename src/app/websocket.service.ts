import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Stomp } from '@stomp/stompjs'
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: any;
  videoUrl: SafeResourceUrl | undefined;
  private videoChunks: ArrayBuffer[] = [];

  constructor(private sanitizer: DomSanitizer) { this.initConnectionSocket() }

  initConnectionSocket() {
    const wsUrl = `${environment.apiUrl}/ws`;
    const socket = new SockJS(wsUrl);
    this.stompClient = Stomp.over(socket);
  }

  getFrame(): void {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/getVideo`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        this.handleVideoChunk(messageContent);
      });
    });
  }

  requestVideo(roomId: string) {
    this.videoUrl = undefined; // Clear previous video URL
    this.videoChunks = [];
    this.stompClient.send(`/app/requestVideo/${roomId}`);
  }

  private handleVideoChunk(chunk: any) {
    /*
    this.videoChunks.push(chunk.data);
    if (chunk.lastChunk) {
      this.downloadVideo();
    }
    */

    const blob = new Blob([chunk.data], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(blob);
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  /*
  private downloadVideo() {
    const concatenatedChunks = new Blob(this.videoChunks, { type: 'video/mp4' });
    this.downloadBlobAsMp4(concatenatedChunks, 'sample-video.mp4');
  }
  */

  /*
  private downloadBlobAsMp4(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
  */

  getVideoUrl(): SafeResourceUrl | undefined {
    return this.videoUrl;
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
    }
  }

}