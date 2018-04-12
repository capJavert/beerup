
import {ConditionsUtil} from "../utils/ConditionsUtil";
import {BaseComponent} from "./base.component";

export abstract class SortComponent<T> extends BaseComponent {
  private _sortColumn: string;

  abstract get items(): T[];

  get sortColumn(): string {
    return this._sortColumn;
  }

  set sortColumn(value: string) {
    this._sortColumn = value;

    if (ConditionsUtil.isNotNull(this._sortColumn)) {
      this.items.sort((lft, rft) => lft[value] > rft[value] ? 1 : -1);
    }
  }
}
