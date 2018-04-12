import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageEnum} from "./modules/models/language.enum";
import * as firebase from "firebase";
import {UserInstance} from "./modules/user/user.instance";
import {FavoriteService} from "./favorites/favorite.service";
import {CrateService} from "./beer-crate/crate.service";
import {ConditionsUtil} from "./modules/utils/ConditionsUtil";

const appLanguageKey = "app-language";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  defaultLanguage: LanguageEnum = LanguageEnum.English;
  translateSubscription;

  constructor(public translate: TranslateService,
              private favoriteService: FavoriteService,
              private crateService: CrateService) {
    translate.setDefaultLang(LanguageEnum.English);

    if (typeof(Storage) !== "undefined") {
      translate.use(
        localStorage.getItem(appLanguageKey) !== null ?
          localStorage.getItem(appLanguageKey) : this.defaultLanguage);

      localStorage.setItem(appLanguageKey, this.translate.currentLang);
    } else {
      translate.use(this.defaultLanguage);
    }

    this.translateSubscription = translate.onLangChange.subscribe(() => {
      localStorage.setItem(appLanguageKey, this.translate.currentLang);
    });
  }

  async ngOnInit() {
    // catch google oauth redirect
    await firebase.auth().getRedirectResult();

    // if user is logged in fetch user's firebase data
    if (UserInstance.isAuth) {
      let userId = firebase.auth().currentUser.uid;

      // fetch favorites
      firebase.database().ref('/users/' + userId + '/' + this.favoriteService.storageKey)
        .once('value')
        .then((snapshot) => {
          let favorites = snapshot.val();

          if (ConditionsUtil.isNotNull(favorites)) {
            this.favoriteService.favorites = favorites;
          }
        });

      // fetch users
      firebase.database().ref('/users/' + userId + '/' + this.crateService.storageKey)
        .once('value')
        .then((snapshot) => {
          let crates = snapshot.val();

          if (ConditionsUtil.isNotNull(crates)) {
            this.crateService.crates = crates;
          }
        });
    }
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }
}
