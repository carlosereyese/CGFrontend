import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Movements } from '../domain/movements';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { MovementsService } from '../movements.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  movements: Movements[];

  constructor(private movementsService: MovementsService, private http: HttpClient) { this.movements = [] }
  apiUrl: string = `${environment.apiUrl}`;
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  ngOnInit() {
    if (this.paginator) {
      this.paginator.pageSize = 10; // Set the initial page size
      this.paginator.pageSizeOptions = [5, 10, 25, 100]; // Define page size options
    }

    this.movementsService.getAllMovements().subscribe(
      (response) => {
        this.movements = response;
          console.log('Movements:', this.movements);
      },
      (error) => {
        if (error.status === 401) {
          console.error('Unauthorized:', error);
        } else {
          console.error('Error:', error);
        }
      }
    );

  }

}
