import { useCallback, useReducer, useState } from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET };

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent } = action;

  switch (action.type) {
    case 'UNDO': {
      if (past.length === 0) {
        return state;
      }

      //左一
      const previous = past[past.length - 1];
      //左头至左一（不含）
      const newPast = past.slice(0, past.length - 1);

      return { past: newPast, present: previous, future: [present, ...future] };
    }
    case 'REDO': {
      if (future.length === 0) {
        return state;
      }

      //右一
      const next = future[0];
      //右一（不含）至右尾
      const newFuture = future.slice(0);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case 'SET':
      if (newPresent === present) {
        return state;
      }

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case 'RESET':
      return {
        past: [],
        present: newPresent,
        future: [],
      };
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  // const [state, setState] = useState<{
  //   past: T[];
  //   present: T;
  //   future: T[];
  // }>({
  //   past: [],
  //   present: initialPresent,
  //   future: [],
  // });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });

    // setState((currentState) => {
    //   const { past, present, future } = currentState;

    //   if (past.length === 0) {
    //     return currentState;
    //   }

    //   //左一
    //   const previous = past[past.length - 1];
    //   //左头至左一（不含）
    //   const newPast = past.slice(0, past.length - 1);

    //   return { past: newPast, present: previous, future: [present, ...future] };
    // });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });

    // setState((currentState) => {
    //   const { past, present, future } = currentState;

    //   if (future.length === 0) {
    //     return currentState;
    //   }

    //   //右一
    //   const next = future[0];
    //   //右一（不含）至右尾
    //   const newFuture = future.slice(0);

    //   return {
    //     past: [...past, present],
    //     present: next,
    //     future: newFuture,
    //   };
    // });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ newPresent, type: 'SET' });

    // setState((currentState) => {
    //   const { past, present, future } = currentState;

    //   if (newPresent === present) {
    //     return currentState;
    //   }

    //   return {
    //     past: [...past, present],
    //     present: newPresent,
    //     future: [],
    //   };
    // });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({ type: 'RESET' });

    // setState(() => {
    //   return {
    //     past: [],
    //     present: newPresent,
    //     future: [],
    //   };
    // });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
