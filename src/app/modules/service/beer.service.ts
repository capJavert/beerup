import {Injectable} from "@angular/core";
import {WebService} from "./web.service";
import {Beer} from "../models/beer";
import {HttpClient} from "@angular/common/http";

/**
 * Beer service used for fetching beers
 */
@Injectable()
export class BeerService extends WebService<Beer> {
  constructor(http: HttpClient) {
    super(http);
  }

  get endpoint(): string {
    return "/beers";
  }

  get primaryKey(): string {
    return Beer.primaryKey;
  }
}
