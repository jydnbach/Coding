import { useState } from "react";

import Input from "./Input";

export default function AddProjectPage({}) {
  const [cancel, setCancel] = useState();
  const [save, setSave] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  function handleCancel() {
    setCancel();
  }

  function handleSave() {
    setSave();
  }

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDesc(e) {
    setDesc(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div onSubmit={handleSubmit} className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={handleCancel}
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
        <Input label="Title" onChange={handleTitle} />
        <Input label="Description" textarea onChange={handleDesc} />
        <Input label="Due Date" datePicker onChange={(date) => setDate(date)} />
      </form>
    </div>
  );
}
