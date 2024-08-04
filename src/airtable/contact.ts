import { AirtableServiceBase } from "./base";
import { IContact } from "./types";

class ContactApiServiceBase extends AirtableServiceBase<IContact> {
  constructor() {
    super({ tableName: "contacts" });
  }
}

export const ContactApiService = new ContactApiServiceBase();
