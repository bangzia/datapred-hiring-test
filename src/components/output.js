/** @jsxImportSource @emotion/react */

import * as React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { Trends } from "./trends";

function Output({ runId, token }) {
  const { data, run, isSuccess, isError, error } = useAsync();

  React.useEffect(() => {
    run(
      client(`flows/1/runs/${runId}/outputs`, {
        token,
      })
    );
  }, [runId, run, token]);
  return (
    <div>
      {isSuccess ? (
        data.results.length ? (
          data.results.map((output) => (
            <div key={output.id}>
              <Trends runId={runId} outputId={output.id} token={token} />
            </div>
          ))
        ) : (
          <p>No output available</p>
        )
      ) : null}
      {isError ? <p>{error}</p> : null}
    </div>
  );
}

export { Output };
