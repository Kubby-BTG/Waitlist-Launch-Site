import { AirtableServiceBase } from "../base";
import { IDeliveryIssue } from "../types";

class DeliveryIssuesApiServiceBase extends AirtableServiceBase<IDeliveryIssue> {
  constructor() {
    super({ tableName: "delivery_issues" });
  }
}

export const DeliveryIssuesApiService = new DeliveryIssuesApiServiceBase();
