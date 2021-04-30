import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Environment } from '../../environments/environment.interface';
import { LeaderboardRecord } from './leaderboard/leaderboard.component';

export class IDashboardService {
    getAll: () => Observable<DashboardData>;
}

@Injectable()
class DashboardService implements IDashboardService {

    constructor(private http: HttpClient) { }

    getAll: () => Observable<DashboardData>;
}

@Injectable()
class LocalDashboardService implements IDashboardService {
    private NAMES_KEY = 'dashboard';

    constructor() {
        const mockData: DashboardData = {
            YourNames: {
                NameCount: 27,
                TotalNames: 12332,
                MostPopularName: {
                    Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e',
                    Date: new Date('2020-01-01T16:00:00.000Z'),
                    Name: 'Name1', Count: 231242
                }
            },
            YourRecentNames: [
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T16:00:00.000Z'), Name: 'Name1', Count: 231242 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T14:00:00.000Z'), Name: 'Name2', Count: 2312 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T12:00:00.000Z'), Name: 'Name3', Count: 231 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T10:00:00.000Z'), Name: 'Name4', Count: 23 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T08:00:00.000Z'), Name: 'Name5', Count: 2 },
            ],
            YourPopular: [
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 1, Name: 'Name1', Count: 231242 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 2, Name: 'Name2', Count: 2312 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 3, Name: 'Name3', Count: 231 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 4, Name: 'Name4', Count: 23 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 5, Name: 'Name5', Count: 2 },
            ],
            CommunityRecentNames: [
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T16:00:00.000Z'), Name: 'Name1', Count: 231242 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T14:00:00.000Z'), Name: 'Name2', Count: 2312 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T12:00:00.000Z'), Name: 'Name3', Count: 231 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T10:00:00.000Z'), Name: 'Name4', Count: 23 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Date: new Date('2020-01-01T08:00:00.000Z'), Name: 'Name5', Count: 2 },
            ],
            CommunityPopular: [
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 1, Name: 'Name1', Count: 231242 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 2, Name: 'Name2', Count: 2312 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 3, Name: 'Name3', Count: 231 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 4, Name: 'Name4', Count: 23 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 5, Name: 'Name5', Count: 2 },
            ],
            CommunityAllTime: [
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 1, Name: 'Name1', Count: 231242 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 2, Name: 'Name2', Count: 2312 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 3, Name: 'Name3', Count: 231 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 4, Name: 'Name4', Count: 23 },
                { Id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e', Rank: 5, Name: 'Name5', Count: 2 },
            ]
        };
        localStorage.setItem(this.NAMES_KEY, JSON.stringify(mockData));
    }

    getAll(): Observable<DashboardData> {
        return of(this.fetchAll());
    }
    private fetchAll(): DashboardData {
        return JSON.parse(localStorage.getItem(this.NAMES_KEY));
    }
}

export function dashboardFactory(environment: Environment, httpClient: HttpClient): IDashboardService {
    switch (environment.name) {
        case 'development':
            return new LocalDashboardService();
        case 'qa':
        case 'production':
            return new DashboardService(httpClient);
    }
}

export interface DashboardData {
    YourRecentNames: LeaderboardRecord[];
    YourPopular: LeaderboardRecord[];
    YourNames: YourNamesDashboardData;
    CommunityRecentNames: LeaderboardRecord[];
    CommunityPopular: LeaderboardRecord[];
    CommunityAllTime: LeaderboardRecord[];
}

export interface YourNamesDashboardData {
    MostPopularName: LeaderboardRecord;
    NameCount: number;
    TotalNames: number;
}
