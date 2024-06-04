import { useState, useRef } from "react";

import Input from "./Input";
import Modal from "./Modal";

export default function AddProjectPage({ onAdd, onCancel }) {
  const refTitle = useRef();
  const refDesc = useRef();
  const refDate = useRef();
  const refModal = useRef();

  function handleSave() {
    const enteredTitle = refTitle.current.value;
    const enteredDesc = refDesc.current.value;
    const enteredDate = refDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDesc.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      refModal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDesc,
      dueDate: enteredDate,
    });
  }

  return (
    <>
      <Modal ref={refModal} buttonCaption="Okay">
        <h1 className="text-3xl font-bold text-stone-700 my-4">
          Invalid Input
        </h1>
        <p className="text-stone-600 mb-4">
          Please provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              type="submit"
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>

        <form>
          <Input ref={refTitle} label="Title" type="text" />
          <Input ref={refDesc} label="Description" textarea />
          <Input ref={refDate} label="Due Date" type="date" />
        </form>
      </div>
    </>
  );
}
