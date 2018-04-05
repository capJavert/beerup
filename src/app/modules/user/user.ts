import {Session} from "./session";

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
    return this._session != null;
  }
}
