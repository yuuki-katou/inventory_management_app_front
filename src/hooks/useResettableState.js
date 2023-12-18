import { useState, useCallback } from "react";

function useResettableState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);
  return [value, setValue, reset];
}

export default useResettableState;
