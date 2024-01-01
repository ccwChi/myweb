import { Table } from "flowbite-react";
import { demoExpense } from "../../data/expense";
import React, { useState } from "react";

const columns = [
  {
    id: 0,
    label: "主類別",
    value: "type",
    width: "15%",
    color: "",
  },
  {
    id: 1,
    label: "次類別",
    value: "subtype",
    width: "15%",
    color: "",
  },
  { id: 2, label: "日期", value: "date", width: "20%", color: "" },
  {
    id: 3,
    label: "金額",
    value: "amount",
    width: "10%",
    color: "",
  },
  {
    id: 4,
    label: "帳戶",
    value: "account",
    width: "10%",
    color: "",
  },
  { id: 5, label: "店家", value: "store", width: "", color: "" },
  { id: 6, label: "", value: "edit", width: "20px", color: "" },
];



const AccountTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          {columns.map((c, i) => (
            <Table.HeadCell
              key={i}
              scope="col"
              className={`px-4 py-3 border-b min-w-[${
                c.width
              }] overflow-y-hidden 
              ${(i === 0 || i === 2 || i === 3 || i === 6) && "table-cell"}
              ${(i === 1 || i === 4) && "hidden sm:table-cell"} 
              ${i === 5 && "hidden lg:table-cell"}
              ${i === 6 && "w-[10px]"}
              `}
              >
              {c.label}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {demoExpense.map((d, i) => (
            <React.Fragment key={i}>
              <Table.Row
                key={i}
                className={`px-4 py-3 overflow-y-hidden cursor-pointer hover:bg-slate-200 ${
                  expandedRow === i && "bg-slate-200"
                }`}
                onClick={() => {
                  handleRowClick(i);
                }}
              >
                {Object.values(d).map((value, i) => (
                  <Table.Cell
                    key={i}
                    className={`px-4 py-2 overflow-y-auto border-b 
                    ${(i === 0 || i === 2 || i === 3) && "table-cell"}
                    ${(i === 1 || i === 4) && "hidden sm:table-cell"} 
                    ${i === 5 && "hidden lg:table-cell"}
                    ${i === 6 && "hidden "}
                    
                    `}
                  >
                    {value}
                  </Table.Cell>
                ))}

                <Table.Cell
                  className="px-4 py-2
                  flex items-center justify-center"
                  >
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>

              {expandedRow === i && (
                <Table.Row className="">
                  <Table.Cell
                    className=" border-b h-fit p-2"
                    colSpan={columns.length + 1}
                  >
                    <span className="w-full flex ">
                      <span className="  w-[70px] text-center te">註記:</span>{" "}
                      <span className=" ">{d.detail}</span>
                    </span>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AccountTable;



