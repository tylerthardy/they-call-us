import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Name } from '../../data-model/Name';
import { Environment } from '../../environments/environment.interface';

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

    get(id: string): Observable<Name> {
        return of(this.fetchAll().find(n => n.id === id));
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
        const idx = names.findIndex(n => n.id === name.id);
        names[idx] = name;
        localStorage.setItem(this.NAMES_KEY, JSON.stringify(names));
        return of(name.id);
    }
    delete(id: string): Observable<boolean> {
        const names = this.fetchAll();
        const idx = names.findIndex(n => n.id === id);
        names.splice(idx);
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
