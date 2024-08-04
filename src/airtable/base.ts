import { AppConfig } from "../utils/constants";
import { ICreateRecordsRequest, ICreateRecordsResponse, IQueryParameters, IRecordListResponse, IRecords } from "./types";

function joinUrlAndParams({ url, params }: { url: string; params: Record<string, string> | undefined }) {
  if (!(params && typeof params === "object" && Object.keys(params).length)) {
    return url;
  }
  const param01 = new URLSearchParams(params);

  const url01 = new URL(url);

  param01.forEach((value, name) => {
    url01.searchParams.append(name, value);
  });

  return url01.toString();
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AppConfig.KUBBY_WEB_AIRTABLE_ACCESS_TOKEN}`,
  };
}

async function getData({ url, query }: { url: string; query?: Record<string, any> }) {
  const res = await fetch(joinUrlAndParams({ url, params: query }), {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Error occured");
  }

  return res.json();
}

async function deleteData({ url }: { url: string }) {
  const res = await fetch(url, {
    method: "DELTE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Error occured");
  }

  return res.json();
}

async function postOrPutData({ formData, url, method }: { formData: any; url: string; method: "POST" | "PUT" }) {
  const res = await fetch(url, {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Error occured");
  }
  return res.json();
}

async function putData({ formData, url }: { formData: any; url: string }) {
  return postOrPutData({ formData, method: "PUT", url });
}

async function postData({ formData, url }: { formData: any; url: string }) {
  return postOrPutData({ formData, method: "POST", url });
}

const ApiUrls = {
  BASE_URL: "https://api.airtable.com/v0",
  // createTable: (baseId: string) => `${ApiUrls.BASE_URL}/meta/bases/${baseId}/tables`,
  // updateTable: ({ baseId, tableIdOrName }: { baseId: string; tableIdOrName: string }) => {
  //   return `${ApiUrls.BASE_URL}/meta/bases/${baseId}/tables/${tableIdOrName}`;
  // },
  createRecord: ({ baseId, tableIdOrName }: { baseId: string; tableIdOrName: string }) => {
    return `${ApiUrls.BASE_URL}/${baseId}/${tableIdOrName}`;
  },
  getRecords: ({ baseId, tableIdOrName }: { baseId: string; tableIdOrName: string }) => {
    return `${ApiUrls.BASE_URL}/${baseId}/${tableIdOrName}`;
  },
  updateRecord: ({ baseId, tableIdOrName, recordId }: { baseId: string; tableIdOrName: string; recordId: string }) => {
    return `${ApiUrls.BASE_URL}/${baseId}/${tableIdOrName}/${recordId}`;
  },
  getRecordById: ({ baseId, tableIdOrName, recordId }: { baseId: string; tableIdOrName: string; recordId: string }) => {
    return `${ApiUrls.BASE_URL}/${baseId}/${tableIdOrName}/${recordId}`;
  },
  deleteRecordById: ({ baseId, tableIdOrName, recordId }: { baseId: string; tableIdOrName: string; recordId: string }) => {
    return `${ApiUrls.BASE_URL}/${baseId}/${tableIdOrName}/${recordId}`;
  },
};

type IBaseRecord = {
  id: string;
  createdTime: string;
} & Record<string, any>;

export abstract class AirtableServiceBase<T extends IBaseRecord> {
  private readonly tableName: string;

  constructor({ tableName }: { tableName: string }) {
    this.tableName = tableName;
  }

  private formatMergeRecord(result: IRecords<T>) {
    return { ...result.fields, id: result.id } as T;
  }

  async createRecordBase({ recordData }: { recordData: T }) {
    try {
      const records: ICreateRecordsRequest<T>[] = [
        {
          fields: recordData,
        },
      ];

      const url = ApiUrls.createRecord({
        baseId: AppConfig.KUBBY_WEB_AIRTABLE_DATABASE,
        tableIdOrName: this.tableName,
      });

      const result = (await postData({ formData: { records }, url })) as ICreateRecordsResponse<T>;

      if (!result?.records?.length) {
        return null;
      }

      return this.formatMergeRecord(result.records[0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteRecordBase({ recordId }: { recordId: string }) {
    try {
      const url = ApiUrls.deleteRecordById({
        baseId: AppConfig.KUBBY_WEB_AIRTABLE_DATABASE,
        tableIdOrName: this.tableName,
        recordId,
      });

      type IResult = {
        deleted: boolean;
        id: string;
      };

      const result = (await deleteData({ url })) as IResult;

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateRecordBase({ recordData }: { recordData: Partial<T> }) {
    try {
      if (!recordData?.id) {
        return null;
      }

      const url = ApiUrls.updateRecord({
        baseId: AppConfig.KUBBY_WEB_AIRTABLE_DATABASE,
        tableIdOrName: this.tableName,
        recordId: recordData.id,
      });

      const record01 = {
        ...recordData,
        id: undefined,
        createdTime: undefined,
      };

      const result = (await putData({ formData: record01, url })) as IRecords<T>;

      return this.formatMergeRecord(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByRecordIdBase({ recordId }: { recordId: string }) {
    try {
      const url = ApiUrls.getRecordById({
        baseId: AppConfig.KUBBY_WEB_AIRTABLE_DATABASE,
        tableIdOrName: this.tableName,
        recordId,
      });

      const result = (await getData({ url })) as IRecords<T>;

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findRecordBase({ query }: { query?: IQueryParameters<T> } = {}) {
    try {
      const url = ApiUrls.getRecords({
        baseId: AppConfig.KUBBY_WEB_AIRTABLE_DATABASE,
        tableIdOrName: this.tableName,
      });

      const result = (await getData({ url, query })) as IRecordListResponse<T>;

      if (!result?.records?.length) {
        return [];
      }

      return result.records.map((item) => this.formatMergeRecord(item));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
