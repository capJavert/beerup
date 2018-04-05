/**
 * Base web service model
 */

export abstract class Model {
  static primaryKey;

  fromJson(jsonObject) {
    Object.assign(this, jsonObject);
  }
}
