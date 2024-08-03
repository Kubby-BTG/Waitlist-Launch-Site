import Airtable, { FieldSet, Record as AirtableRecord } from "airtable";
import type { AirtableBase } from "airtable/lib/airtable_base";
import { AppConfig } from "../helpers/constants";

const ApiUrls = {
  BASES: "https://api.airtable.com/v0/meta/bases",
  createTable: (baseId: string) => `${ApiUrls.BASES}/${baseId}/tables`,
  updateTable: ({
    baseId,
    tableIdOrName,
  }: {
    baseId: string;
    tableIdOrName: string;
  }) => {
    return `${ApiUrls.BASES}/${baseId}/tables/${tableIdOrName}`;
  },
};

let __base: AirtableBase | undefined;

function getInstance() {
  if (__base) {
    return __base;
  }
  __base = new Airtable({
    apiKey: AppConfig.KUBBY_WEB_AIRTABLE_ACCESS_TOKEN,
  }).base(AppConfig.KUBBY_WEB_AIRTABLE_DATABASE);
  return __base;
}

type IBaseRecord = { id: string } & Record<string, any>;

export abstract class AirtableServiceBase<T extends IBaseRecord> {
  private readonly tableName: string;

  constructor({ tableName }: { tableName: string }) {
    this.tableName = tableName;
  }

  private getTable() {
    return getInstance()(this.tableName);
  }

  private formatMergeRecord(result: AirtableRecord<FieldSet>) {
    return { ...result.fields, id: result.id } as T;
  }

  async createRecordBase({ recordData }: { recordData: Partial<T> }) {
    try {
      const result = await this.getTable().create(recordData);

      return this.formatMergeRecord(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteRecordBase({ recordId }: { recordId: string }) {
    try {
      const result = await this.getTable().destroy(recordId);

      return this.formatMergeRecord(result);
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

      const result = await this.getTable().update(recordData.id, {
        ...recordData,
        id: undefined,
      });

      return this.formatMergeRecord(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByRecordIdBase({ recordId }: { recordId: string }) {
    try {
      const result = await this.getTable().find(recordId);

      return this.formatMergeRecord(result);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findRecordBase({
    pageSize,
    fields,
  }: { pageSize?: number; fields?: (keyof T)[] } = {}) {
    return new Promise<T[]>((resolve, reject) => {
      const results: any[] = [];

      this.getTable()
        .select({
          pageSize,
          fields: fields?.length ? (fields as string[]) : undefined,
        })
        .eachPage(
          (records, fetchNextPage) => {
            const records01 = records?.map((record) => {
              // console.log("Retrieved record:", record);
              return this.formatMergeRecord(record);
            });

            if (records01?.length) results.push(...records01);

            if (records?.length && pageSize && records.length >= pageSize) {
              fetchNextPage();
            } else {
              resolve(results);
            }
          },
          (err) => {
            reject(err);
          },
        );
    });
  }
}

// export const AirtableService = new AirtableServiceBase();
