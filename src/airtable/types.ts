export interface IDeliveryIssue {
  id: string;
  createdTime: string;
  //
  email: string;
  zipcode: string;
  issue: string;
  shipping_carrier: string;
  purchase_store_name: string;
  delivery_name: string;
}

export interface IWaitList {
  id: string;
  createdTime: string;
  //
  email: string;
  reasonForJoining: string;
}

export interface IPartner {
  id: string;
  createdTime: string;
  //
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

export interface IQueryParameters<T> {
  pageSize?: number;
  maxRecords?: number;
  offset?: string;
  sort?: {
    field?: string;
    direction?: "asc" | "desc";
  };
  fields?: (keyof T)[];
  cellFormat?: "json" | "string";
}

// "records": [
//   {
//     "createdTime": "2022-09-12T21:03:48.000Z",
//     "fields": {
//       "Address": "333 Post St",
//       "Name": "Union Square",
//       "Visited": true
//     },
//     "id": "rec560UJdUtocSouk"
//   },
//   {
//     "createdTime": "2022-09-12T21:03:48.000Z",
//     "fields": {
//       "Address": "1 Ferry Building",
//       "Name": "Ferry Building"
//     },
//     "id": "rec3lbPRG4aVqkeOQ"
//   }
// ]
