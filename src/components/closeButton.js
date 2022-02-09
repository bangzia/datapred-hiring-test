/** @jsxImportSource @emotion/react */

import * as React from "react";

const CloseButton = ({ width = "30", height = "30" }) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
  >
    <path
      fill="#333"
      d="M29.3 2.8 17.2 15l12.2 12.2-2.1 2.2L15 17.1 2.8 29.4.7 27.2 12.8 15 .7 2.8 2.8.6 15 12.9 27.2.6l2.1 2.2z"
    />
  </svg>
);

export { CloseButton };
