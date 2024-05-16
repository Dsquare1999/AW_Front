import { AdminBondType } from "@/app/types/AdminBondType";
import { BondFieldName } from "@/schemas/BondSchema";
export interface BondSelectField {
  name: "isin";
  type: "bond";
  placeholder: string;
  options: AdminBondType[];
}

interface SelectField {
  name: BondFieldName;
  type: "select";
  placeholder: string;
  options: string[];
}

interface TextField {
  name: BondFieldName;
  type: "text";
  placeholder: string;
}

interface DateField {
  name: BondFieldName;
  type: "date";
  placeholder: string;
}

interface NumberField {
  name: BondFieldName;
  type: "number";
  placeholder: string;
  min?: number;
}

export type AllFormField =
  | BondSelectField
  | SelectField
  | TextField
  | DateField
  | NumberField;

export type AllAddFormValues = {
  [K in keyof AllFormField]: "type" extends keyof AllFormField[K]
    ? AllFormField[K]["type"] extends "select"
      ? string
      : AllFormField[K]["type"] extends "bond"
      ? string
      : AllFormField[K]["type"] extends "number"
      ? string
      : AllFormField[K]["type"] extends "date"
      ? string
      : string
    : string;
};

  
const BondFields : AllFormField[ ]= [
    {
      name: "isin",
      type: "bond",
      placeholder: "Code Isin",
      options: [],
    },
    {
      name: "outstanding",
      type: "number",
      placeholder: "Bond Outstanding",
    },
    {
      name: "issuer",
      type: "text",
      placeholder: "Bond Issuer",
    },
    {
      name: "value_date",
      type: "date",
      placeholder: "Bond Value Date",
    },
    {
      name: "due_date",
      type: "date",
      placeholder: "Bond Due Date",
    },
    {
      name: "facial_rate",
      type: "number",
      placeholder: "Bond Facial Rate",
    },
    {
      name: "refund",
      type: "select",
      placeholder: "Refund",
      options: ["IF", "AC", "ACD"],
    },
    {
      name: "differed",
      type: "number",
      placeholder: "Differed",
      min: 0,
    },
    {
      name: "refinancing",
      type: "select",
      placeholder: "Refinancing",
      options: ["Yes", "No"],
    },
    {
      name: "guarantee",
      type: "select",
      placeholder: "Guarantee",
      options: ["Yes", "No"],
    },
    {
      name: "total_number",
      type: "number",
      placeholder: "Bond Total Number",
      min: 0,
    },
    {
      name: "number_available",
      type: "number",
      placeholder: "Bond Available Number",
      min: 0,
    },
    {
      name: "type",
      type: "select",
      placeholder: "Bond Type",
      options: ["OAT", "BAT"],
    },
    {
      name: "period",
      type: "select",
      placeholder: "Bond Period",
      options: ["A", "S", "T"],
    },
    {
      name: "cotation",
      type: "text",
      placeholder: "Bond Daily Cotation",
    },
    {
      name: "reference_value",
      type: "text",
      placeholder: "Bond Daily Cotation",
    },
  ];

export default BondFields ;
