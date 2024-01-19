import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../video.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  spaces: string[] = ['Salon', 'Habitacion', 'Cocina'];

  videoTitle: string = 'test';
  videoUrl: SafeResourceUrl | undefined;

  constructor(private videoService: VideoService, private webSocketService: WebsocketService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    /*
    this.videoService.getVideo(this.videoTitle).subscribe((data: any) => {
        const blob = new Blob([data], { type: 'video/mp4' });
        this.videoUrl = URL.createObjectURL(blob);
    });
    */

    this.videoService.getVideoStream(this.videoTitle).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(blob);
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    });

    this.webSocketService.getFrame();
  }

  sendMessage() {
    console.log("enviando solicitud de video");
    this.webSocketService.requestVideo("cocina2");
  }

}
