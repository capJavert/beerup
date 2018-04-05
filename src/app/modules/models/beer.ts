import {Model} from "./model";

/**
 * Beer model (extra cold)
 */
export class Beer extends Model {
  id: number;
  name: string;
  description: string;
  abv: number;
  ibu: number;

  constructor(id?: number, name?: string, description?: string, abv?: number, ibu?: number) {
    super();

    Beer.primaryKey = "id";

    this.id = id;
    this.name = name;
    this.description = description;
    this.abv = abv;
    this.ibu = ibu;
  }
}
