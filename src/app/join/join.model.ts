
import {Model} from "../modules/models/model";
import {RsvpEnum} from "./rsvp.enum";

export const emailRegex = new RegExp("[^ @]*@[^ @]*");

/**
 * JoinModel representing form data sent during Beerup subscription
 */
export class JoinModel extends Model {
  name: string;
  email: string;
  phone: string;
  rsvp: RsvpEnum;
  comment: string;
  subscribe: boolean;
  reminder: boolean;

  constructor(name?: string,
              email?: string,
              phone?: string,
              rsvp?: RsvpEnum,
              comment?: string,
              subscribe: boolean = true,
              reminder: boolean = false) {
    super();

    JoinModel.primaryKey = "id";

    this.name = name;
    this.email = email;
    this.phone = phone;
    this.rsvp = rsvp;
    this.comment = comment;
    this.subscribe = subscribe;
    this.reminder = reminder;
  }
}

/**
 * Validator containing keys representing invalid fields
 */
export class Validator {
  errors: string[] = [];

  /**
   * Returns true if validator is empty eg. contains no errors
   *
   * @returns {boolean}
   */
  get isSuccess() {
    return this.errors.length === 0;
  }
}
