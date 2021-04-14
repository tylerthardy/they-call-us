import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Name } from '../../data-model/Name';
import { INamesService } from './names.service';

@Injectable({ providedIn: 'root' })
export class NamesResolver implements Resolve<Name> {
  constructor(private namesService: INamesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
      const id = route.paramMap.get('id');
      if (!id) {
          return of(null);
      }
      return this.namesService.get(id);
  }
}
