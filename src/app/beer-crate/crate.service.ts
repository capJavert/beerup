
import {Injectable} from "@angular/core";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {StorageService} from "../modules/service/storage.service";

const storageKey = "beerup-crate";

@Injectable()
export class CrateService extends StorageService {
  /**
   * Load current crate into memory from local storage
   *
   * @returns {number[]}
   */
  get crate(): string[] {
    if (this.isStorageAvailable) {
      return JSON.parse(localStorage.getItem(storageKey));
    } else {
      return [];
    }
  }

  /**
   * Set current crate to local storage
   * @param {number[]} value
   */
  set crate(value: string[]) {
    if (this.isStorageAvailable) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }

  constructor() {
    super();

    if (this.isStorageAvailable) {
      if (ConditionsUtil.isNull(this.crate)) {
        // if no favorites stored init storage
        localStorage.setItem(
          storageKey,
          JSON.stringify([])
        );
      }
    }
  }
}
