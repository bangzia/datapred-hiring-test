/** @jsxImportSource @emotion/react */

import * as React from "react";
import { Logo } from "./logo";
import { Button } from "./lib";
function NavBar({ logout }) {
  return (
    <nav
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 1em",
        borderBottom: "1px solid #d9d9d9",
        boxShadow: " 0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Logo aria-label="logo" width="250" />
      <Button
        css={{ padding: "0.5rem 1.5rem", width: "100px" }}
        onClick={logout}
      >
        Logout
      </Button>
    </nav>
  );
}

export { NavBar };
