
import {Injectable} from "@angular/core";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";

const storageKey = "beerup-crate";

@Injectable()
export class CrateService {
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

  /**
   * Check if storage is available/supported inside browser
   * @returns {boolean}
   */
  get isStorageAvailable(): boolean {
    return typeof(Storage) !== "undefined";
  }
}
