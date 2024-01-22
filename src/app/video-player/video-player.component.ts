import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../video.service';
import { WebsocketService } from '../websocket.service';
import { SpacesService } from '../spaces.service';
import { Spaces } from '../domain/spaces';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  
  spaces: Spaces[];
  videoUrl: SafeResourceUrl | undefined;

  constructor(private videoService: VideoService, private spacesService: SpacesService, 
    private sanitizer: DomSanitizer/*, private webSocketService: WebsocketService*/) { this.spaces = [] }

  ngOnInit() {

    this.spacesService.getAllSpaces()
      .subscribe(spaces => this.spaces = spaces);
    
    //this.webSocketService.getFrame();
  }

  getVideoUrl(videoTitle: string) {
    this.videoUrl = undefined;
    this.videoService.getVideoStream(videoTitle).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(blob);
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    });
  }

  /*
  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

  requestVideo() {
    this.webSocketService.requestVideo(this.videoTitle);
  }

  getVideoUrl() {
    return this.webSocketService.getVideoUrl();
  }
  */

}
