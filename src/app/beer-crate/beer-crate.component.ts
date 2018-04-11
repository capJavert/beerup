import {Component} from '@angular/core';
import {ConditionsUtil} from "../modules/utils/ConditionsUtil";
import {CrateService} from "./crate.service";

@Component({
  selector: 'app-beer-crate',
  templateUrl: './beer-crate.component.html',
  styleUrls: ['./beer-crate.component.less']
})
export class BeerCrateComponent {
  crate1: string[] = [];
  selectedBeerIndex: number;

  constructor(public crateService: CrateService) {
    this.selectedBeerIndex = null;
    this.crate1 = this.crateService.crate;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    let beerImageSrc = event.dataTransfer.getData("text");

    if (this.crate1.length < 20) {
      this.crate1.push(beerImageSrc);
    }

    this.crateService.crate = this.crate1;
  }

  dropTrash(event) {
    event.preventDefault();

    if (ConditionsUtil.isNotNull(this.selectedBeerIndex)) {
      this.crate1.splice(this.selectedBeerIndex, 1);
      this.selectedBeerIndex = null;

      this.crateService.crate = this.crate1;
    }
  }

  drag(index: number) {
    this.selectedBeerIndex = index;
  }
}
