
import {Injectable} from "@angular/core";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {StorageService} from "../modules/service/storage.service";
import * as firebase from "firebase";
import {UserInstance} from "../modules/user/user.instance";

@Injectable()
export class CrateService extends StorageService {
  get storageKey(): string {
    return "beerup-crate";
  }

  /**
   * Load current crate into memory from local storage
   *
   * @returns {number[]}
   */
  get crates(): string[][] {
    if (this.isStorageAvailable) {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } else {
      return [];
    }
  }

  /**
   * Set current crate to local storage
   * @param {number[]} value
   */
  set crates(value: string[][]) {
    if (this.isStorageAvailable) {
      localStorage.setItem(this.storageKey, JSON.stringify(value));
      this.onChange.next(true);

      if (UserInstance.isAuth) {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId + '/' + this.storageKey).set(value);
      }
    }
  }

  constructor() {
    super();

    if (this.isStorageAvailable) {
      if (ConditionsUtil.isNull(this.crates)) {
        // if no favorites stored init storage
        localStorage.setItem(
          this.storageKey,
          JSON.stringify([[], [], []])
        );
      }
    }
  }

  addBeerToCrate(beerSrc: string, crateIndex: number) {
    let crates = this.crates;
    crates[crateIndex].push(beerSrc);

    this.crates = crates;
  }
}
