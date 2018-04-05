
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {WebService} from "./web.service";
import {LoaderService} from "../loader/loader.service";
import {NotificationService} from "../notification/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorResponse} from "./error.response";

export class ServiceDataSource<T> implements DataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private _length = 0;

  constructor(private dataService: WebService<T>,
              private loader: LoaderService,
              private notificationService: NotificationService) {}

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  loadData(pageSize: number, pageIndex: number = 0) {
    this.loader.start();

    this.dataService.list({
      params: {
        offset: (pageIndex * pageSize).toString(),
        limit: (pageSize).toString()
      }
    }).subscribe(response => {
        this.dataSubject.next(response.data);
        this.length = response.count;
      },
      error => this.handleError(error),
      () => this.loader.stop()
    );
  }

  filterData(params: {[param: string]: string | string[]}, pageSize: number) {
    this.loader.start();

    params.limit = pageSize.toString();

    this.dataService.list({
      params: params
    }).subscribe(response => {
        this.dataSubject.next(response.data);
        this.length = response.count;
      },
      error => this.handleError(error),
      () => this.loader.stop()
    );
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }

  get data(): T[] {
    return this.dataSubject.getValue();
  }

  sortData(sortedData: T[]) {
    this.dataSubject.next(sortedData);
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    let errorResponse = Object.assign(new ErrorResponse, httpErrorResponse.error);

    if (!errorResponse.isEmpty) {
      this.notificationService.show(errorResponse.errorMessage + ": " + errorResponse.errorDetails);
    } else {
      this.notificationService.show(httpErrorResponse.message);
    }

    this.loader.stop();
  }
}
