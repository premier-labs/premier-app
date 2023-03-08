import React, { useRef } from "react";

export function useR3fState<F>(defaultValue: F): [React.MutableRefObject<F>, Function] {
  const ref = useRef<F>(defaultValue);

  const updateRef = (newValue: F) => {
    ref.current = newValue;
  };

  return [ref, updateRef];
}

export function useCState<F>(defaultValue: F): [F, React.MutableRefObject<F>, Function] {
  const [state, setState] = React.useState(defaultValue);
  const [refState, setRefState] = useR3fState(defaultValue);

  const customSetState = (newValue: F) => {
    setState(newValue);
    setRefState(newValue);
  };

  return [state, refState, customSetState];
}
