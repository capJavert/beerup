
import {EventEmitter} from "@angular/core";

export abstract class StorageService {
  onChange = new EventEmitter<boolean>();

  abstract get storageKey(): string;

  /**
   * Check if storage is available/supported inside browser
   * @returns {boolean}
   */
  get isStorageAvailable(): boolean {
    return typeof(Storage) !== "undefined";
  }
}
