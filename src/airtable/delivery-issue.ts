import { AirtableServiceBase } from "./base";
import { IWaitList } from "./types";

class DeliveryIssuesApiServiceBase extends AirtableServiceBase<IWaitList> {
  constructor() {
    super({ tableName: "delivery_issues" });
  }
}

export const DeliveryIssuesApiService = new DeliveryIssuesApiServiceBase();
