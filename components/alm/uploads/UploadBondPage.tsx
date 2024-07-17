"use client";

import { useCallback, useEffect, useState } from "react";
import UploadBond from "./UploadBond";
import { Button } from "../../ui/button";
import { DisplayTable } from "./datatable/DisplayTable";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";

import {
  useBondMutation,
  useBackofficeMutation,
} from "@/redux/features/uploadApiSlice";
import { toast } from "react-toastify";

interface RowData {
  rowId: string;
  [key: string]: any;
}

interface SheetsProps {
  sheetId: string;
  sheetName: string;
  endpoint: string | null;
  headers: string[];
  rows: RowData[];
  errors?: string[];
}

interface DataTableProps {
  fileId: string;
  fileName: string;
  sheets: SheetsProps[];
}

interface UploadBondPageProps {
  isAdminPage?: boolean;
}

type endpointProps = "backoffice" | "bond" | "customer_loan" | "eib" | "pib" | "dat" | "refi" | "op_injection" | "op_retrait";

const portfolioTypes : {endpoint?: endpointProps; title: string }[] = [
  { endpoint: "bond", title: "Bond Portfolio" },
  { endpoint: "customer_loan", title: "Customer Loans Portfolio" },
  { endpoint: "eib", title: "EIB Portfolio" },
  { endpoint: "pib", title: "PIB Portfolio" },
  { endpoint: "dat", title: "DAT Portfolio" },
  { endpoint: "refi", title: "Refi Portfolio" },
  { endpoint: "op_injection", title: "OP Injection Portfolio" },
  { endpoint: "op_retrait", title: "OP Retrait Portfolio" },
];

const UploadBondPage = ({ isAdminPage }: UploadBondPageProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    isAdminPage ? isAdminPage : false
  );
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<endpointProps | undefined>(undefined);
  const [dataTableData, setDataTableData] = useState<DataTableProps[]>([]);
  const [rejectedDataTableData, setRejectedDataTableData] = useState<
    DataTableProps[]
  >([]);

  const [bond] = useBondMutation();
  const [backoffice] = useBackofficeMutation();

  const changeDisplaying = useCallback(() => {
    setIsDisplayed((prevIsDisplayed) => !prevIsDisplayed);
  }, []);

  const previsualizeData = useCallback(
    (
      receivedDataTableData: DataTableProps[],
      receivedRejectedDataTableData: DataTableProps[],
      receivedEndpoint: endpointProps | undefined,
      receivedIsAdmin: boolean
    ) => {
      setIsAdmin(receivedIsAdmin);
      setEndpoint(receivedEndpoint);
      setDataTableData(receivedDataTableData);
      setRejectedDataTableData(receivedRejectedDataTableData);
      changeDisplaying();
    },
    [changeDisplaying]
  );

  const updateData = (
    receivedDataTableData: DataTableProps[],
    receivedRejectedDataTableData: DataTableProps[]
  ) => {
    setDataTableData(receivedDataTableData);
    setRejectedDataTableData(receivedRejectedDataTableData);
  };

  useEffect(() => {}, [isDisplayed]);

  const submitBonds = async () => {
    let submitEndpoint = "";
    dataTableData.forEach((dataTable: DataTableProps) => {
      if (dataTable.sheets && dataTable.sheets.length > 0) {
        dataTable.sheets.forEach((sheet) => {
          try {
            if (!isAdmin) {
              submitEndpoint = endpoint
                ? endpoint
                : sheet.endpoint
                ? sheet.endpoint
                : "backoffice";
            } else {
              submitEndpoint = "backoffice";
            }

            sheet.rows.forEach(async (row) => {
              await upload(submitEndpoint as endpointProps, row);
            });
          } catch (error) {
            console.log("Something went wrong here ... : ", error);
          }
        });
      }
    });
  };

  const upload = async (endpoint: endpointProps, row: any) => {
    if (endpoint === "bond") {
      try {
        await bond(row).unwrap();
        toast.success("Bond Successful Upload");
      } catch {
        toast.error("Error Uploading Bond");
      }
    } else if (endpoint === "backoffice") {
      try {
        await backoffice(row).unwrap();
        toast.success("Admin Bond Successful Upload");
      } catch {
        toast.error("Error Uploading Bond");
      }
    }
  };

  return (
    <div>
      {isDisplayed ? (
        <ScrollArea className="h-[90vh]">
          <div className="flex justify-end items-center space-x-2 mb-4">
            <Button type="button" onClick={changeDisplaying}>
              <span className="mr-2 w-4 h-4">
                <IoIosArrowRoundBack />
              </span>
              Back
            </Button>
            <Button type="button" onClick={submitBonds}>
              <span className="mr-2 w-4 h-4">
                <IoCloudUploadOutline />
              </span>
              Upload Bonds
            </Button>
          </div>
          <DisplayTable
            FilesDataTables={dataTableData}
            RejectedFilesDataTables={rejectedDataTableData}
            endpoint={endpoint}
            isAdmin={isAdmin}
            updateData={(dataTableData, rejectedDataTableData) =>
              updateData(dataTableData, rejectedDataTableData)
            }
          />
        </ScrollArea>
      ) : (
        <div className="h-full w-full p-1">
          <div className="grid grid-cols-5">
            <div className="col-span-1 md:col-span-2">
              <UploadBond
                isAdmin={isAdmin}
                previsualize={(
                  dataTableData,
                  rejectedDataTableData,
                  endpoint,
                  isAdmin
                ) =>
                  previsualizeData(
                    dataTableData,
                    rejectedDataTableData,
                    endpoint,
                    isAdmin
                  )
                }
              />
            </div>
            {portfolioTypes.map(({ endpoint, title }) => (
              <div key={endpoint} className="col-span-1 md:col-span-1">
                <UploadBond
                  endpoint={endpoint}
                  isAdmin={isAdmin}
                  title={title}
                  previsualize={(
                    dataTableData,
                    rejectedDataTableData,
                    endpoint,
                    isAdmin
                  ) =>
                    previsualizeData(
                      dataTableData,
                      rejectedDataTableData,
                      endpoint,
                      isAdmin
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBondPage;
