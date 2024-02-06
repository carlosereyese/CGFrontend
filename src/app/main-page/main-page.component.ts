import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Movements } from '../domain/movements';
import { environment } from '../../environments/environment';
import { MovementsService } from '../movements.service';
import { MatDialog } from '@angular/material/dialog';
import { ImgModalComponent } from '../img-modal/img-modal.component';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  movements: Movements[];
  private refreshSubscription: Subscription = new Subscription;
  detectionButtonText: string = 'Activar Deteccion';
  alarmButtonText: string = 'Activar Alarma';


  constructor(private movementsService: MovementsService, private dialog: MatDialog) { this.movements = [] }
  apiUrl: string = `${environment.apiUrl}`;
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  ngOnInit() {
    if (this.paginator) {
      this.paginator.pageSize = 10;
      this.paginator.pageSizeOptions = [5, 10, 25, 100];
    }

    this.refreshSubscription = timer(0, 5000).subscribe(() => {
      this.loadMovements();
    });

  }

  loadMovements() {
    this.movementsService.getAllMovements()
      .subscribe(movements => this.movements = movements);
  }

  openModal(movement: Movements) {
    this.dialog.open(ImgModalComponent, {
      data: { image: movement.image }
    });
  }

  toggleDetection() {
    this.detectionButtonText = (this.detectionButtonText === 'Activar Deteccion') ? 'Desactivar Deteccion' : 'Activar Deteccion';
  }

  toggleAlarm() {
    this.alarmButtonText = (this.alarmButtonText === 'Activar Alarma') ? 'Desactivar Alarma' : 'Activar Alarma';
  }

}
