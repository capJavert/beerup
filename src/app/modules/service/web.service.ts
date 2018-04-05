
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

export abstract class WebService<T> {
  private _base = "https://api.punkapi.com";
  private _path = "/v2";
  protected serviceBase: string;
  protected servicePath: string;

  constructor(protected http: HttpClient) {
    if (environment.name === "test") {
      this.testMode = true;
    } else {
      this.serviceBase = this.base + this.path;
      this.servicePath = this.serviceBase + this.endpoint;
    }
  }

  get base(): string {
    return this._base;
  }

  get path(): string {
    return this._path;
  }

  abstract get endpoint(): string;
  abstract get primaryKey(): string;

  get(id): Observable<T> {
    return this.http.get<T>(this.servicePath + "/" + id);
  }

  list(options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.servicePath, options);
  }

  /**
   * Enable only when performing tests
   * Dont forget to run e2e/test-server.js
   *
   * @param {boolean} value
   */
  set testMode(value: boolean) {
    if (value) {
      this._base = "http://localhost:3200";
      this._path = "";
    } else {
      this._base = "https://api.punkapi.com";
      this._path = "/v2";
    }

    this.serviceBase = this.base + this.path;
    this.servicePath = this.serviceBase + this.endpoint;
  }
}
