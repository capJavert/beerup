
import {Injectable} from "@angular/core";
import {ConditionsUtil} from "../utils/ConditionsUtil";
import {AppNotification} from "./app.notification";

@Injectable()
export class NotificationService {
  private _notificationRef = null;
  private notificationStack: Array<AppNotification> = [];

  constructor() {}

  show(message: string, params?, action: string = "Close", duration: number = 3000) {
    // TODO show notification
  }

  dismiss() {
    if (ConditionsUtil.isNotNullNorEmpty(this._notificationRef)) {
      this._notificationRef.dismiss();
      this._notificationRef = null;
    }
  }

  private notificationExists(lhs: AppNotification): boolean {
    for (let rhs of this.notificationStack) {
      if (lhs.message === rhs.message && lhs.action === rhs.action) {
        return true;
      }
    }

    return false;
  }
}
