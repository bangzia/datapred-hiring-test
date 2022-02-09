/** @jsxImportSource @emotion/react */

import "bootstrap/dist/css/bootstrap-reboot.css";
import * as React from "react";
import { Logo } from "./components/logo";
import "@reach/dialog/styles.css";
import {
  Button,
  Input,
  FormGroup,
  Spinner,
  ErrorMessage,
} from "./components/lib";
import { Modal, ModalContents, ModalOpenButton } from "./components/modal";
import { useAsync } from "./utils/hooks";

function LoginForm({ onSubmit, submitButton }) {
  const { isLoading, isError, error, run } = useAsync();
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    run(
      onSubmit({
        username: username.value,
        password: password.value,
      })
    );
  }
  return (
    <form
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "> div": {
          margin: "10px auto",
          width: "100%",
          maxWidth: "300px",
        },
      }}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        {/* <label htmlFor="username">Username</label> */}
        <Input id="username" type="text" placeholder="Username" />
      </FormGroup>
      <FormGroup>
        {/* <label htmlFor="password">Password</label> */}
        <Input id="password" type="password" placeholder="Email" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  );
}

function UnauthenticatedApp({ login }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Logo width="250" />

        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="">
            <LoginForm onSubmit={login} submitButton={<Button>Login</Button>} />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export { UnauthenticatedApp };
