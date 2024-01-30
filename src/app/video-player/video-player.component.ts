import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { WebsocketService } from '../websocket.service';
import { SpacesService } from '../spaces.service';
import { Spaces } from '../domain/spaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  
  spaces: Spaces[];
  frame: string = '';
  private frameSubscription: Subscription;

  constructor(private videoService: VideoService, private spacesService: SpacesService, 
    private webSocketService: WebsocketService, private changeDetectorRef: ChangeDetectorRef) { 
      this.spaces = [];
      this.frameSubscription = this.webSocketService.getFrame().subscribe((url) => {
        this.frame = url == undefined? '' : url ;
        this.changeDetectorRef.detectChanges();
      });
     }

  ngOnInit() {

    this.spacesService.getAllSpaces()
      .subscribe(spaces => this.spaces = spaces);
    
    this.webSocketService.getFrames();

  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

  requestVideo(videoTitle: string) {
    this.webSocketService.requestVideo(videoTitle);
  }

}
