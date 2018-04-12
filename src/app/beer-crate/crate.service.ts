
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
  get crates(): string[][] {
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
  set crates(value: string[][]) {
    if (this.isStorageAvailable) {
      localStorage.setItem(storageKey, JSON.stringify(value));
      this.onChange.next(true);
    }
  }

  constructor() {
    super();

    if (this.isStorageAvailable) {
      if (ConditionsUtil.isNull(this.crates)) {
        // if no favorites stored init storage
        localStorage.setItem(
          storageKey,
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
