
import {Injectable} from "@angular/core";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {Beer} from "../modules/models/beer";
import {StorageService} from "../modules/service/storage.service";
import * as firebase from "firebase";
import {UserInstance} from "../modules/user/user.instance";

@Injectable()
export class FavoriteService extends StorageService {
  private _favorites: Beer[] = [];

  get storageKey(): string {
    return "beerup-favorites";
  }

  /**
   * Load current favorites into memory from local storage
   *
   * @returns {number[]}
   */
  get favorites(): Beer[] {
    if (this.isStorageAvailable) {
      return JSON.parse(localStorage.getItem(this.storageKey));
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
      if (ConditionsUtil.isNull(this.favorites)) {
        // if no favorites stored init storage
        localStorage.setItem(
          this.storageKey,
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
