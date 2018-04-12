import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ConfigService} from "../../modules/config/config.service";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {UserInstance} from "../../modules/user/user.instance";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  private loginProvider;

  constructor(private translate: TranslateService,
              private configService: ConfigService) {
    this.loginProvider = new firebase.auth.GoogleAuthProvider();
    this.loginProvider.addScope('https://www.googleapis.com/auth/plus.login');
  }

  async ngOnInit() {
    await firebase.auth().getRedirectResult();
  }

  get language() {
    return this.translate.currentLang;
  }

  set language(value) {
    this.translate.use(value);
  }

  get appVersion(): Observable<any> {
    return this.configService.appVersion;
  }

  get isAuth(): boolean {
    return UserInstance.isAuth;
  }

  login() {
    firebase.auth().signInWithRedirect(this.loginProvider).then();
  }

}
