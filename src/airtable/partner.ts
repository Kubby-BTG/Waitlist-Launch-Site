import { AirtableServiceBase } from "./base";
import { IPartner } from "./types";

class PartnersApiServiceBase extends AirtableServiceBase<IPartner> {
  constructor() {
    super({ tableName: "partners" });
  }
}

export const PartnersApiService = new PartnersApiServiceBase();
