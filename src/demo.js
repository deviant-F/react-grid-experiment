import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns
} from "@devexpress/dx-react-grid-material-ui";
import ScrollContainer from "react-indiana-drag-scroll";

import { generateRows, globalSalesValues } from "./demo-data/generator";

const RowTemplate = (props) => {
  return (
    <React.Fragment>
      <Table.Row
        style={{
          width: "100%",
          height: "16px",
          border: "1px solid rgba(224, 224, 224, 1)"
        }}
      >
        <div
          style={{
            width: "100%",
            position: "absolute",
            background:
              "linear-gradient(90deg, rgba(0,176,255,1) 0%, rgba(0,176,255,1) 22%, rgba(240,146,14,1) 22%, rgba(240,146,14,1) 77%, rgba(242,220,12,1) 77%, rgba(242,220,12,1) 100%)",
            zIndex: 301,
            display: "flex",
            justifyContent: "flex-end",
            height: "6px",
            marginTop: "10px"
          }}
        >
          <div
            style={{
              width: `${100 - (props.tableRow.rowId + 1) * 10}%`,
              background: "rgba(255,255,255,0.8)"
            }}
          ></div>
        </div>
      </Table.Row>
      <Table.Row {...props}>{props.children}</Table.Row>
    </React.Fragment>
  );
};

const BodyTemplate = (props) => (
  <ScrollContainer className="scroll-container">
    {props.children}
  </ScrollContainer>
);

export default () => {
  const [columns] = useState([
    { name: "region", title: "Region" },
    { name: "sector", title: "Sector" },
    { name: "channel", title: "Channel" },
    { name: "customer", title: "Customer" },
    { name: "product", title: "Product" },
    { name: "saleDate", title: "Sale date" },
    { name: "units", title: "Units" },
    { name: "amount", title: "Sale Amount" }
  ]);
  const [rows] = useState(
    generateRows({ columnValues: globalSalesValues, length: 8 })
  );
  const [tableColumnExtensions] = useState([
    { columnName: "region", width: 150 },
    { columnName: "sector", width: 180 },
    { columnName: "channel", width: 120 },
    { columnName: "product", width: 230 },
    { columnName: "customer", width: 230 },
    { columnName: "saleDate", width: 130 },
    { columnName: "units", width: 80 },
    { columnName: "amount", align: "right", width: 140 }
  ]);
  const [leftColumns] = useState(["region"]);
  const [rightColumns] = useState(["amount"]);

  return (
    <Paper style={{ width: "800px" }}>
      <div style={{ position: "relative" }}>
        <Grid rows={rows} columns={columns}>
          <Table
            columnExtensions={tableColumnExtensions}
            rowComponent={RowTemplate}
            containerComponent={BodyTemplate}
          />
          <TableHeaderRow />
          <TableFixedColumns
            leftColumns={leftColumns}
            rightColumns={rightColumns}
          />
        </Grid>
      </div>
    </Paper>
  );
};
