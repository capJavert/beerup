import {Component} from '@angular/core';
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {CrateService} from "./crate.service";

@Component({
  selector: 'app-beer-crate',
  templateUrl: './beer-crate.component.html',
  styleUrls: ['./beer-crate.component.less']
})
export class BeerCrateComponent {
  crates: string[][];
  activeCrateIndex: number;
  selectedBeerIndex: number;

  constructor(public crateService: CrateService) {
    this.selectedBeerIndex = null;
    this.crates = this.crateService.crates;
    this.activeCrateIndex = 0;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  get activeCrate(): string[] {
    return this.crates[this.activeCrateIndex];
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
