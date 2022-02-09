/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import { Dialog as ReachDialog } from "@reach/dialog";
import * as colors from "../styles/colors";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
const Spinner = styled(CgSpinnerTwoAlt)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

const buttonVariants = {
  primary: {
    background: colors.pink,
    color: colors.base,
  },
  secondary: {
    background: colors.grey,
    color: colors.black,
  },
};
const Button = styled.button(
  {
    padding: "1rem",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
    display: "block",
    width: "100%",
    fontFamily: "Roboto,sans-serif",
    fontWeight: "500",
    letterSpacing: "0.25px",
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);
const inputStyles = {
  border: `1px solid ${colors.grey10}`,
  background: colors.grey20,
  padding: "8px 12px",
  fontFamily: "Roboto ,sans-serif",
};
const Input = styled.input({ borderRadius: "3px" }, inputStyles);

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "44px",
  height: "44px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.base,
  color: colors.text,
  border: `none`,
  cursor: "pointer",
  ":hover": {
    background: colors.grey20,
  },
});

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
});

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: "4em",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  );
}

const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

function ErrorMessage({ error, variant = "stacked", ...props }) {
  return (
    <div
      role="alert"
      css={[{ color: colors.red }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  );
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.red,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export {
  FullPageSpinner,
  FullPageErrorFallback,
  ErrorMessage,
  Dialog,
  Button,
  CircleButton,
  Input,
  FormGroup,
  Spinner,
};
