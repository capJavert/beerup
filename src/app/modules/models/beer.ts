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
  image_url: string;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  favorited: boolean;

  constructor(id?: number,
              name?: string,
              description?: string,
              abv?: number,
              ibu?: number,
              image_url?: string,
              food_pairing?: string[],
              brewers_tips?: string,
              contributed_by?: string,
              favorited: boolean = false) {
    super();

    Beer.primaryKey = "id";

    this.id = id;
    this.name = name;
    this.description = description;
    this.abv = abv;
    this.ibu = ibu;
    this.image_url = image_url;
    this.food_pairing = food_pairing;
    this.brewers_tips = brewers_tips;
    this.contributed_by = contributed_by;
    this.favorited = favorited;
  }
}
