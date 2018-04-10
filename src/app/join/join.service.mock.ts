
import {Injectable} from "@angular/core";
import {WebService} from "../modules/service/web.service";
import {emailRegex, JoinModel, Validator} from "./join.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class JoinServiceMock extends WebService<JoinModel> {

  constructor(http: HttpClient) {
    super(http);
  }

  get endpoint(): string {
    return "/join";
  }
  get primaryKey(): string {
    return JoinModel.primaryKey;
  }

  /**
   * Subscribe to Beerup service method mock
   *
   * @param {JoinModel} model
   * @returns {Observable<Validator>}
   */
  joinBeerUp(model: JoinModel): Observable<Validator> {
    let validator = new Validator();

    if (ConditionsUtil.isNullOrEmpty(model.name)) {
      validator.errors.push("fullName");
    }

    if (!emailRegex.test(model.email)) {
      validator.errors.push("email");
    }

    if (ConditionsUtil.isNullOrEmpty(model.phone)) {
      validator.errors.push("phone");
    }

    if (ConditionsUtil.isNullOrEmpty(model.rsvp)) {
      validator.errors.push("rsvp");
    }

    // adds random 500 - 2000 ms delay
    return Observable.of(validator).delay(Math.floor((Math.random() * 2000) + 500));
  }
}
