import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from "../modules/components/base.component";
import {NotificationService} from "../modules/notification/notification.service";
import {HotkeysService} from "angular2-hotkeys";
import {LoaderService} from "../modules/loader/loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Beer} from "../modules/models/beer";

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.less']
})
export class BeerListComponent extends BaseComponent {
  @Input() data: Beer[];

  constructor(notificationService: NotificationService,
              hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute) {
    super(notificationService, hotkeysService, loader, router, activatedRoute);
  }
}
