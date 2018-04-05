import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../modules/components/base.component";
import {HotkeysService} from "angular2-hotkeys";
import {NotificationService} from "../modules/notification/notification.service";
import {LoaderService} from "../modules/loader/loader.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(notificationService: NotificationService,
              _hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute) {

    super(notificationService, _hotkeysService, loader, router, activatedRoute);
  }

  ngOnInit() {
  }

}
