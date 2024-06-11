import { useState } from 'react';

export function useInput(defaultValue) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const [didEdit, setDidEdit] = useState(false);
}
