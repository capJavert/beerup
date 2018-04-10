import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormComponent} from "../modules/components/form.component";
import {NotificationService} from "../modules/notification/notification.service";
import {HotkeysService} from "angular2-hotkeys";
import {LoaderService} from "../modules/loader/loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {emailRegex, JoinModel, Validator} from "./join.model";
import {JoinServiceMock} from "./join.service.mock";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.less']
})
export class JoinComponent extends FormComponent<JoinModel> implements OnInit, OnDestroy {
  validator: Validator;
  isLoading: boolean;
  loaderSubscription;
  form: FormGroup;
  joinSuccess: boolean; // indicates subscription status

  constructor(notificationService: NotificationService,
              hotkeysService: HotkeysService,
              loader: LoaderService,
              router: Router,
              activatedRoute: ActivatedRoute,
              public dataService: JoinServiceMock) {
    super(notificationService, hotkeysService, loader, router, activatedRoute, dataService);

    this.isLoading = false;
    this.joinSuccess = false;
  }

  init() {
    // async loader subscription
    this.loader.loading$.subscribe(response => this.isLoading = response);

    this.model = new JoinModel();
    this.validator = new Validator();

    // set form validation rules
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex)
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      rsvp: new FormControl(null, [
        Validators.required,
      ]),
      comment: new FormControl(''),
      subscribe: new FormControl(true),
      reminder: new FormControl(false),
    });
  }

  ngOnDestroy() {
    if (ConditionsUtil.isNotNull(this.loaderSubscription)) {
      this.loaderSubscription.unsubscribe();
    }
  }

  /**
   * Submit form and do validation
   */
  submit() {
    this.validate();

    this.loader.start();

    this.dataService.joinBeerUp(this.form.value as JoinModel).subscribe(
      (response) => {
        this.validator = response;

        if (this.validator.isSuccess) {
          this.joinSuccess = true;
        } else {
          new ScrollHelper("invalid").doScroll();
        }
      },
      error => this.handleError(error),
      () => this.loader.stop()
    );
  }

  private validate() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsDirty({ onlySelf: true });
    });
  }
}

/**
 * Helper class for scrolling to specific field element
 */
class ScrollHelper {
  classToScrollTo: string = null;

  constructor(classToScrollTo: string) {
    this.classToScrollTo = classToScrollTo;
  }

  doScroll() {
    if (!this.classToScrollTo) {
      return;
    }
    try {
      let elements = document.getElementsByClassName(this.classToScrollTo);

      if (elements.length === 0) {
        return;
      }

      elements[0].scrollIntoView();
    }
    finally {
      this.classToScrollTo = null;
    }
  }
}
