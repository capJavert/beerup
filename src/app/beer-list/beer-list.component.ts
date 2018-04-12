import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseComponent} from "../modules/components/base.component";
import {NotificationService} from "../modules/notification/notification.service";
import {HotkeysService} from "angular2-hotkeys";
import {LoaderService} from "../modules/loader/loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Beer} from "../modules/models/beer";
import {FavoriteService} from "../favorites/favorite.service";

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.less']
})
export class BeerListComponent extends BaseComponent {
  @Output() loadMore = new EventEmitter<boolean>();
  @Input() data: Beer[];
  @Input() isLoading?: boolean;
  Arr = Array;
  selectedBeer: Beer;

  constructor(notificationService: NotificationService,
              hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute,
              public favoriteService: FavoriteService) {
    super(notificationService, hotkeysService, loader, router, activatedRoute);

    this.data = [];
  }

  /**
   * Favorite or Unfavorite beer
   * Works through favorite service
   *
   * @param {Beer} beer
   * @param event
   */
  toggleFavorite(beer: Beer, event) {
    event.stopPropagation();

    if (!this.favoriteService.isFavorite(beer)) {
      this.favoriteService.favorite(beer);
    } else {
      this.favoriteService.unfavorite(beer);
    }
  }

  showDetails(beer: Beer) {
    this.selectedBeer = Object.assign(new Beer(), beer);
  }

  drag(event) {
    event.dataTransfer.setData("text", event.target.src);
  }
}
