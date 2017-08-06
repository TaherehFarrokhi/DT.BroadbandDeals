import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Deal } from './deal';

@Injectable()
export class DealsService {

  protected dealUrl = 'http://localhost:5000/api/v1/deals';

  constructor(private http: Http) { }

  getAll(): Promise<Deal[]> {
    return this.http.get(this.dealUrl)
      .toPromise()
      .then(res => {
        const deals = res.json() as Deal[];
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
