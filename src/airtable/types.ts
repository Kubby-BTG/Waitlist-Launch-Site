export interface IDeliveryIssue {
  id: string;
  createdTime: string;
  //
  email: string;
  zipcode: string;
  zipcode_latitude: number;
  zipcode_longitude: number;
  //
  issue: string;
  shipping_carrier: string;
  purchase_store_name: string;
  delivery_date: string;
  state: string;
  city: string;
}

export interface IWaitList {
  id: string;
  createdTime: string;
  //
  email: string;
  reasonForJoining: string;
  referralCode: string;
}

export interface IContact {
  id: string;
  createdTime: string;
  //
  email: string;
  name: string;
  phone: string;
  comment: string;
}

export interface IPartner {
  id: string;
  createdTime: string;
  //
  name: string;
  email: string;
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

export interface ICreateRecordsRequest<T> {
  fields: T;
}

export interface IRecords<T> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface ICreateRecordsResponse<T> {
  records: IRecords<T>[];
}

export interface IRecordListResponse<T> {
  records: IRecords<T>[];
}

export interface IQueryParameters<T = any> {
  pageSize?: number;
  maxRecords?: number;
  offset?: string;
  sort?: {
    field?: keyof T;
    direction?: "asc" | "desc";
  }[];
  fields?: (keyof T)[];
  cellFormat?: "json" | "string";
  filterByFormula?: string;
}
