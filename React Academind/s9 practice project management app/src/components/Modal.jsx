import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const refDialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        refDialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={refDialog}
      className="backdrop:bg-stone-900/85 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.querySelector("#modal-root")
  );
});

export default Modal;
