import {Component, OnDestroy} from '@angular/core';
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {CrateService} from "./crate.service";
import {UserInstance} from "../modules/user/user.instance";

@Component({
  selector: 'app-beer-crate',
  templateUrl: './beer-crate.component.html',
  styleUrls: ['./beer-crate.component.less']
})
export class BeerCrateComponent implements OnDestroy {
  crates: string[][];
  private _activeCrateIndex: number;
  selectedBeerIndex: number;
  private onCratesChanged;

  constructor(public crateService: CrateService) {
    this.selectedBeerIndex = null;
    this.crates = this.crateService.crates;
    this.activeCrateIndex = 0;

    this.onCratesChanged = this.crateService.onChange.subscribe(
      () => this.crates = this.crateService.crates
    );
  }

  ngOnDestroy() {
    if (ConditionsUtil.isNotNull(this.onCratesChanged)) {
      this.onCratesChanged.unsubscribe();
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  get activeCrate(): string[] {

    if (ConditionsUtil.isNull(this.crates[this.activeCrateIndex])) {
      this.crates[this.activeCrateIndex] = [];
    }

    return this.crates[this.activeCrateIndex];
  }

  get activeCrateIndex(): number {
    return this._activeCrateIndex;
  }

  set activeCrateIndex(value: number) {
    this._activeCrateIndex = value;
    UserInstance.session.activeCrateIndex = this._activeCrateIndex;
  }

  drop(event) {
    event.preventDefault();
    let beerImageSrc = event.dataTransfer.getData("text");

    if (this.activeCrate.length < 20 && ConditionsUtil.isNotNullNorEmpty(beerImageSrc)) {
      this.activeCrate.push(beerImageSrc);
      this.crateService.crates = this.crates;
    }
  }

  dropTrash(event) {
    event.preventDefault();

    if (ConditionsUtil.isNotNull(this.selectedBeerIndex)) {
      this.activeCrate.splice(this.selectedBeerIndex, 1);
      this.selectedBeerIndex = null;

      this.crateService.crates = this.crates;
    }
  }

  drag(index: number) {
    this.selectedBeerIndex = index;
  }
}
