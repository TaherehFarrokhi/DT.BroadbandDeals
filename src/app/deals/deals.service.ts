import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Deal } from './deal';

@Injectable()
export class DealsService {

  constructor(private http: Http) { }

  getAll(): Promise<Deal[]> {
    const url = `assets/deals.json`;

    return this.http.get(url)
      .toPromise()
      .then(res => {
        const deals = res.json().deals as Deal[];
        return deals;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    const errorMessage = `Error in loading deals. ${error.message || error}`;
    console.error(errorMessage, error);
    return Promise.reject(errorMessage);
  }
}
