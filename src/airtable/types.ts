export interface IDeliveryIssue {
  email: string;
  zipcode: string;
  issue: string;
  shipping_carrier: string;
  purchase_store_name: string;
  delivery_name: string;
}

export interface IWaitList {
  email: string;
  reasonForJoining: string;
}

export interface IPartner {
  name: string;
  work_email: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  company: string;
}
