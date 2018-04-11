
export abstract class StorageService {
  /**
   * Check if storage is available/supported inside browser
   * @returns {boolean}
   */
  get isStorageAvailable(): boolean {
    return typeof(Storage) !== "undefined";
  }
}
