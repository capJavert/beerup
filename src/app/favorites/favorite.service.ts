
import {EventEmitter, Injectable} from "@angular/core";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {Beer} from "../modules/models/beer";
import {StorageService} from "../modules/service/storage.service";

const storageKey = "beerup-user";

@Injectable()
export class FavoriteService extends StorageService {
  private _favorites: Beer[] = [];
  onChange = new EventEmitter<boolean>();

  /**
   * Load current favorites into memory from local storage
   *
   * @returns {number[]}
   */
  get favorites(): Beer[] {
    if (this.isStorageAvailable) {
      return JSON.parse(localStorage.getItem(storageKey));
    } else {
      return [];
    }
  }

  /**
   * Set current favorites to local storage
   * @param {number[]} value
   */
  set favorites(value: Beer[]) {
    if (this.isStorageAvailable) {
      localStorage.setItem(storageKey, JSON.stringify(value));
      this.onChange.next(true);
    }
  }

  constructor() {
    super();

    if (this.isStorageAvailable) {
      if (ConditionsUtil.isNull(this.favorites)) {
        // if no favorites stored init storage
        localStorage.setItem(
          storageKey,
          JSON.stringify([])
        );
      } else {
        this._favorites = this.favorites;
      }
    }
  }

  favorite(beer: Beer) {
    this._favorites.push(beer);

    this.favorites = this._favorites;
  }

  unfavorite(beer: Beer) {
    let model = this._favorites.filter(obj => beer.id === obj.id);
    let index = this._favorites.indexOf(model[0]);

    if (index > -1) {
      this._favorites.splice(index, 1);
      this.favorites = this._favorites;
    }
  }

  isFavorite(beer: Beer) {
    return ConditionsUtil.isNotNullNorEmpty(this._favorites.filter(obj => beer.id === obj.id));
  }
}
