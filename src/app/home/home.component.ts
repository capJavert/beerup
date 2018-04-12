import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../modules/components/base.component";
import {HotkeysService} from "angular2-hotkeys";
import {NotificationService} from "../modules/notification/notification.service";
import {LoaderService} from "../modules/loader/loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Beer} from "../modules/models/beer";
import {BeerService} from "../modules/service/beer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements OnInit {
  public beers: Beer[];
  private currentPage: number;

  constructor(notificationService: NotificationService,
              _hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute,
              public beerService: BeerService) {

    super(notificationService, _hotkeysService, loader, router, activatedRoute);

    this.beers = [];
    this.currentPage = 1;
  }

  ngOnInit() {
    this.loader.start();

    this.listBeers();
  }

  loadMore() {
    this.currentPage++;
    this.loader.start();

    this.listBeers();
  }

  private listBeers() {
    this.beerService.list({
      params: {
        per_page: "16",
        page: this.currentPage.toString()
      }
    }).subscribe(
      (response) => {
        this.beers = [...this.beers, ...response];
      },
      error => this.handleError(error),
      () => this.loader.stop()
    );
  }
}
