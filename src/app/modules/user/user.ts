import {Session} from "./session";
import * as firebase from "firebase";

export class User {
  private _session: Session;

  public username: string;
  public firstname: string;
  public lastname: string;

  constructor() {

  }

  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  get isAuth(): boolean {
    return !!firebase.auth().currentUser;
  }
}
