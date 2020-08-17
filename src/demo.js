import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns
} from "@devexpress/dx-react-grid-material-ui";

import { generateRows, globalSalesValues } from "../../../demo-data/generator";

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

  const RowTemplate = (props) => {
    return (
      <React.Fragment>
        <Table.Row {...props}>{props.children}</Table.Row>
        <Table.Row
          style={{
            width: "100%",
            height: "26px",
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
              height: "6px"
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
      </React.Fragment>
    );
  };

  return (
    <div style={{ width: "800px", position: "relative" }}>
      <Paper>
        <Grid rows={rows} columns={columns}>
          <Table
            columnExtensions={tableColumnExtensions}
            rowComponent={RowTemplate}
          />
          <TableHeaderRow />
          <TableFixedColumns
            leftColumns={leftColumns}
            rightColumns={rightColumns}
          />
        </Grid>
      </Paper>
    </div>
  );
};
