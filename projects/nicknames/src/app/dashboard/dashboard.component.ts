import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DashboardData, IDashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  isLoading: boolean;

  data: DashboardData;

  constructor(public dashboardService: IDashboardService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getAll()
      .pipe(tap((results) => {
        this.data = results;
        this.isLoading = false;
      }))
      .subscribe();
  }

  getYourNamesViewTop(): string {
    return `my-names/${this.data.YourNames.MostPopularName.Id}`;
  }
}
