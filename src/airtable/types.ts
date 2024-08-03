export interface IDeliveryIssue {
  id: string;
  email: string;
  zipcode: string;
  issue: string;
  shipping_carrier: string;
  purchase_store_name: string;
  delivery_name: string;
}

export interface IWaitList {
  id: string;
  email: string;
  reasonForJoining: string;
}

export interface IPartner {
  id: string;
  name: string;
  work_email: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  company: string;
}

export interface IWaitListRequest {
  pageSize?: number;
  fields?: (keyof IWaitList)[] | undefined;
}
