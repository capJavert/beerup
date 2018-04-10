import {Component, Input} from '@angular/core';
import {Beer} from "../modules/models/beer";
import {FavoriteService} from "../favorites/favorite.service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.less']
})
export class BeerDetailComponent {
  @Input() beer: Beer;

  constructor(private hotkeysService: HotkeysService,
              public favoriteService: FavoriteService) {

    // modal can be closed with esc or backspace press
    this.hotkeysService.add(new Hotkey(['esc', 'backspace'], (): boolean => {
      this.close();
      return false;
    }, undefined, 'Close modal'));
  }

  close() {
    this.beer = null;
  }

  /**
   * Favorite or Unfavorite selected beer
   * Works through favorite service
   */
  toggleFavorite(event) {
    event.stopPropagation();

    if (!this.favoriteService.isFavorite(this.beer)) {
      this.favoriteService.favorite(this.beer);
    } else {
      this.favoriteService.unfavorite(this.beer);
    }
  }
}
