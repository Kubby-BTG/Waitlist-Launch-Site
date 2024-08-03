import { AirtableServiceBase } from "./base";
import { IWaitList } from "./types";

class PartnersApiServiceBase extends AirtableServiceBase<IWaitList> {
  constructor() {
    super({ tableName: "partners" });
  }
}

export const PartnersApiService = new PartnersApiServiceBase();
