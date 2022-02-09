/** @jsxImportSource @emotion/react */

import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { Output } from "./output";

function CustomDatePicker({ token }) {
  const [date, setDate] = React.useState(null);
  const [queried, setQueried] = React.useState(false);
  const { data, run, isSuccess, isError } = useAsync();

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    run(
      client(
        `flows/1/runs?production_date=${
          date.toISOString().split(".")[0] + "Z"
        }`,
        {
          token,
        }
      )
    );
  }, [date, queried, run, token]);

  function handleDateChange(newDate) {
    newDate.setUTCHours(0, 0, 0, 0);
    setQueried(true);
    setDate(newDate);
  }

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Select a run date"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {isSuccess ? (
        data.results.length ? (
          data.results.map((run) =>
            run.complete ? (
              <div key={run.id}>
                <Output runId={run.id} token={token} />
              </div>
            ) : (
              <p>No complete run for this date</p>
            )
          )
        ) : (
          <p>No runs</p>
        )
      ) : null}
      {isError ? <p>No run available for this date</p> : null}
    </>
  );
}

export { CustomDatePicker };
