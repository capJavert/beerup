import { Component } from '@angular/core';
import {BaseComponent} from "../modules/components/base.component";
import {NotificationService} from "../modules/notification/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderService} from "../modules/loader/loader.service";
import {HotkeysService} from "angular2-hotkeys";
import {FavoriteService} from "./favorite.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less']
})
export class FavoritesComponent extends BaseComponent {

  constructor(notificationService: NotificationService,
              hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute,
              private favoriteService: FavoriteService) {
    super(notificationService, hotkeysService, loader, router, activatedRoute);
  }
}
