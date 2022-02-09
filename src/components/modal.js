/** @jsxImportSource @emotion/react */

import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { Logo } from "./logo";
import { Dialog, CircleButton } from "./lib";
import { CloseButton } from "./closeButton";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = React.createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}
function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentBase {...props}>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <CloseButton width="16" height="16" aria-hidden />
          </CircleButton>
        </ModalDismissButton>
      </div>
      <div css={{ display: "flex", justifyContent: "center" }}>
        <Logo width="250" />
      </div>
      <h3 css={{ textAlign: "center", fontSize: "1.5em" }}>{title}</h3>
      {children}
    </ModalContentBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
