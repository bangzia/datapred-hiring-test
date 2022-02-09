/** @jsxImportSource @emotion/react */

import * as React from "react";
import { NavBar } from "./components/navBar";
import { CustomDatePicker } from "./components/datePicker";

function AuthenticatedApp({ token, logout }) {
  return (
    <React.Fragment>
      <NavBar logout={logout} />
      <div
        css={{
          margin: "0 auto",
          padding: "4em 0em",
          maxWidth: "900px",
          width: "90%",
        }}
      >
        <main css={{ width: "100%" }}>
          <CustomDatePicker token={token} />
        </main>
      </div>
    </React.Fragment>
  );
}

export { AuthenticatedApp };
