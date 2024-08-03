import { AirtableServiceBase } from "./base";
import { IWaitList } from "./types";

class WaitlistApiServiceBase extends AirtableServiceBase<IWaitList> {
  constructor() {
    super({ tableName: "waitlists" });
  }

  find() {
    return super.findRecordBase({ fields: ["email"], pageSize: 900 });
  }
}

export const WaitlistApiService = new WaitlistApiServiceBase();
