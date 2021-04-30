import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Name } from '../../data-model/Name';
import { Environment } from '../../environments/environment.interface';
import { tap } from 'rxjs/operators';

export class INamesService {
    get: (id: string) => Observable<Name>;
    getAll: () => Observable<Name[]>;
    create: (name: Name) => Observable<string>;
    update: (name: Name) => Observable<string>;
    delete: (id: string) => Observable<boolean>;
}

@Injectable()
class NamesService implements INamesService {

    constructor(private http: HttpClient) { }

    get: (id: string) => Observable<Name>;
    getAll: () => Observable<Name[]>;
    create: (name: Name) => Observable<string>;
    update: (name: Name) => Observable<string>;
    delete: (id: string) => Observable<boolean>;
}

@Injectable()
class LocalNamesService implements INamesService {
    private NAMES_KEY = 'names';

    constructor() {
        if (!localStorage.getItem(this.NAMES_KEY)) {
            localStorage.setItem(this.NAMES_KEY, JSON.stringify([]));
        }
        const names = this.fetchAll();
        const testName: Name = {
            id: '02006476-eecc-4ce3-9dd9-d86c7297bd0e',
            createdOn: new Date(),
            rootName: 'test_name',
            clusters: [],
            links: [],
            nodes: [
                {
                    id: 'n-02869ddb-05c5-ced4-55f2-054da5c309ad',
                    label: 'test_name',
                    data: {
                        flagged: true,
                        isRoot: true,
                        displayedColor: '#93a1da',
                        customColor: '#aae3f5',
                        color: '#a8385d'
                    },
                    dimension: {
                        width: 121.20487976074219,
                        height: 50
                    },
                    meta: {
                        forceDimensions: true
                    },
                    position: {
                        x: 80.6024398803711,
                        y: 45
                    },
                    transform: 'translate(20, 20)'
                }
            ]
        };
        const hasTestName = names.find(n => n.id === testName.id);
        if (!hasTestName) {
            names.unshift(testName);
            localStorage.setItem(this.NAMES_KEY, JSON.stringify(names));
        }
    }

    get(id: string): Observable<Name> {
        const all = this.fetchAll();
        return of(all.find(n => n.id === id));
    }
    getAll(): Observable<Name[]> {
        return of(this.fetchAll());
    }
    create(name: Name): Observable<string> {
        const names = this.fetchAll();
        names.push(name);
        localStorage.setItem(this.NAMES_KEY, JSON.stringify(names));
        return of(name.id);
    }
    update(name: Name): Observable<string> {
        const names = this.fetchAll();
        let idx = names.findIndex(n => n.id === name.id);
        if (idx === -1) {
            idx = names.length;
        }
        names[idx] = name;
        localStorage.setItem(this.NAMES_KEY, JSON.stringify(names));
        return of(name.id);
    }
    delete(id: string): Observable<boolean> {
        const names = this.fetchAll();
        const idx = names.findIndex(n => n.id === id);
        names.splice(idx, 1);
        localStorage.setItem(this.NAMES_KEY, JSON.stringify(names));
        return of(true);
    }
    private fetchAll(): Name[] {
        return JSON.parse(localStorage.getItem(this.NAMES_KEY));
    }
}

export function namesFactory(environment: Environment, httpClient: HttpClient): INamesService {
    switch (environment.name) {
        case 'development':
            return new LocalNamesService();
        case 'qa':
        case 'production':
            return new NamesService(httpClient);
    }
}
