import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {

  @Input() title: string;
  @Input() units: string;
  @Input() records: LeaderboardRecord[];
  @Input() footerRouterLink: string;
  @Input() cardIcon: string;
  @Input() isLoading: boolean;
  @Input() isRecentBoard: boolean;
  @Input() routerLink: string;

  constructor() { }

  ngOnInit(): void {
  }

  getFormattedCount(record: LeaderboardRecord): string {
    return `${record.Count} ${this.units}`;
  }

  getRouterLink(record: LeaderboardRecord): string {
    return this.routerLink.replace('{:id}', record.Id);
  }

}

export interface LeaderboardRecord {
  Id: string;
  Name: string;
  Rank?: number;
  Count: number;
  Date?: Date;
}
