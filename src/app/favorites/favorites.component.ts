import {Component, OnDestroy} from '@angular/core';
import {BaseComponent} from "../modules/components/base.component";
import {NotificationService} from "../modules/notification/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderService} from "../modules/loader/loader.service";
import {HotkeysService} from "angular2-hotkeys";
import {FavoriteService} from "./favorite.service";
import {Beer} from "../modules/models/beer";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {SortComponent} from "../modules/components/sort.component";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less']
})
export class FavoritesComponent extends SortComponent<Beer> implements OnDestroy {
  beers: Beer[];
  private onFavoritesChanged;

  constructor(notificationService: NotificationService,
              hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute,
              private favoriteService: FavoriteService) {
    super(notificationService, hotkeysService, loader, router, activatedRoute);

    this.beers = this.favoriteService.favorites;
    this.onFavoritesChanged = this.favoriteService.onChange.subscribe(
      () => this.beers = this.favoriteService.favorites
    );
  }

  ngOnDestroy() {
    if (ConditionsUtil.isNotNull(this.onFavoritesChanged)) {
      this.onFavoritesChanged.unsubscribe();
    }
  }

  get items() {
    return this.beers;
  }
}
