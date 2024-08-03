import { AirtableServiceBase } from "./base";
import { IWaitList } from "./types";

class ContactApiServiceBase extends AirtableServiceBase<IWaitList> {
  constructor() {
    super({ tableName: "contacts" });
  }
}

export const ContactApiService = new ContactApiServiceBase();
