/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const dataTableData = {
  columns: [
    {
      // Build our expander column
      id: "expander", // Make sure it has an ID
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? "👇" : "👉"}
        </span>
      ),
      Cell: ({ row }) =>
        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        // to build the toggle for expanding a row
        row.canExpand ? (
          <span
            {...row.getToggleRowExpandedProps({
              style: {
                // We can even use the row.depth property
                // and paddingLeft to indicate the depth
                // of the row
                paddingLeft: `${row.depth * 2}rem`
              }
            })}
          >
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ) : null
    },
    { Header: "name", accessor: "name", width: "20%" },
    { Header: "Usage", accessor: "position", width: "25%" },
    { Header: "Type", accessor: "office" },
    { Header: "age", accessor: "age", width: "7%" },
    { Header: "Valid Till", accessor: "startDate" },
    { Header: "salary", accessor: "salary" },
  ],

  rows: [
    {
      name: "Hanny Baniard",
      position: "Data Coordiator",
      office: "Baorixile",
      age: 42,
      startDate: "4/11/2021",
      salary: "$474,978",
    },

    {
      name: "Lara Puleque",
      position: "Payment Adjustment Coordinator",
      office: "Cijangkar",
      age: 47,
      startDate: "8/2/2021",
      salary: "$387,287",
    },
    {
      name: "Torie Repper",
      position: "Administrative Officer",
      office: "Montpellier",
      age: 25,
      startDate: "4/21/2021",
      salary: "$94,780",
    },
    {
      name: "Nat Gair",
      position: "Help Desk Technician",
      office: "Imider",
      age: 57,
      startDate: "12/6/2020",
      salary: "$179,177",
    },
      ],
};

export default dataTableData;
