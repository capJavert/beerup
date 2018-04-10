import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./modules/service/auth.interceptor";
import {AuthGuard} from "./app-routing/guards/auth.guard";
import {BaseLayoutComponent} from './_layouts/base-layout/base-layout.component';
import {FooterComponent} from './_layouts/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotificationService} from "./modules/notification/notification.service";
import {HotkeyModule} from "angular2-hotkeys";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LoaderService} from "./modules/loader/loader.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HeaderComponent} from "./_layouts/header/header.component";
import {AppErrorHandler} from "./modules/error/app.error.handler";
import {ErrorService} from "./modules/error/error.service";
import {ErrorComponent} from './error/error.component';
import {ConfigService} from "./modules/config/config.service";
import { BeerListComponent } from './beer-list/beer-list.component';
import {BeerService} from "./modules/service/beer.service";
import { BeerCrateComponent } from './beer-crate/beer-crate.component';
import { JoinComponent } from './join/join.component';
import {JoinServiceMock} from "./join/join.service.mock";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FavoriteService} from "./favorites/favorite.service";
import { FavoritesComponent } from './favorites/favorites.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    FooterComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ErrorComponent,
    BeerListComponent,
    BeerCrateComponent,
    JoinComponent,
    FavoritesComponent,
    BeerDetailComponent,
  ],
  imports: [
    // angular modules
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HotkeyModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    NotificationService,
    LoaderService,
    ErrorService,
    ConfigService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    BeerService,
    JoinServiceMock,
    FavoriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
