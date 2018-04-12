
import {RoleEnum} from "./role.enum";

export class Session {
  private _token: string;
  private _role: RoleEnum;
  activeCrateIndex: number;

  constructor(token: string, role: RoleEnum) {
    this._token = token;
    this._role = role;
    this.activeCrateIndex = 0;
  }

  get token(): string {
    return this._token;
  }

  get headers() {
    return {
      Authorization: this._token
    };
  }
}
