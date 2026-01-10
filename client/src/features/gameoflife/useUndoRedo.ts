import { useState, useCallback, useRef } from 'react';

export interface UndoRedoState<T> {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: () => void;
}

export function useUndoRedo<T>(initialState: T): UndoRedoState<T> {
  const [state, setInternalState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([]);
  const [redoStack, setRedoStack] = useState<T[]>([]);
  const initialStateRef = useRef<T>(initialState);

  const setState = useCallback((newState: T) => {
    setHistory((prev) => [...prev, state]);
    setRedoStack([]);
    setInternalState(newState);
  }, [state]);

  const undo = useCallback(() => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setRedoStack((prev) => [...prev, state]);
    setHistory(newHistory);
    setInternalState(previous);
  }, [history, state]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const next = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);

    setHistory((prev) => [...prev, state]);
    setRedoStack(newRedoStack);
    setInternalState(next);
  }, [redoStack, state]);

  const reset = useCallback(() => {
    setInternalState(initialStateRef.current);
    setHistory([]);
    setRedoStack([]);
  }, []);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0,
    reset,
  };
}
