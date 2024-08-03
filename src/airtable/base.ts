// import Airtable, { FieldSet } from "airtable";

// const ApiUrls = {
//   BASES: "https://api.airtable.com/v0/meta/bases",
//   createTable: (baseId: string) => `${ApiUrls.BASES}/${baseId}/tables`,
//   updateTable: ({
//     baseId,
//     tableIdOrName,
//   }: {
//     baseId: string;
//     tableIdOrName: string;
//   }) => {
//     return `${ApiUrls.BASES}/${baseId}/tables/${tableIdOrName}`;
//   },
// };

// class AirtableServiceBase {
//   private readonly base = new Airtable({ apiKey: "" }).base("");

//   async createTable({
//     tableName,
//     fieldDef,
//   }: {
//     tableName: string;
//     fieldDef: Partial<FieldSet>;
//   }) {
//     try {
//       const result = await this.base(tableName).create({ ...fieldDef });
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// export const AirtableService = new AirtableServiceBase();
