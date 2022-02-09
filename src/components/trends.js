/** @jsxImportSource @emotion/react */

import * as React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { DataGrid } from "@mui/x-data-grid";

function Trends({ runId, outputId, token }) {
  const { data, run, isSuccess, isError, error } = useAsync();
  const columns = [
    {
      field: "horizon_date",
      headerName: "Horizon Date",
      width: 200,
      valueGetter: ({ value }) =>
        value && new Date(value).toLocaleDateString("en-US"),
    },
    { field: "horizon_name", headerName: "Horizon Name", width: 200 },
    { field: "trend", headerName: "Trend", width: 130 },
  ];

  React.useEffect(() => {
    run(
      client(`flows/1/runs/${runId}/outputs/${outputId}/trends`, {
        token,
      })
    );
  }, [runId, outputId, run, token]);

  return (
    <div css={{ marginTop: "1em" }}>
      {isSuccess ? (
        data.results.length ? (
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid rows={data.results} columns={columns} pageSize={5} />
          </div>
        ) : (
          <p>No trends available</p>
        )
      ) : null}
      {isError ? <p>{error}</p> : null}
    </div>
  );
}

export { Trends };
