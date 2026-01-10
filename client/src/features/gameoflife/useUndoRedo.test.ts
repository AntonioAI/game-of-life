import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUndoRedo } from './useUndoRedo';

describe('useUndoRedo', () => {
  describe('initial state', () => {
    it('should initialize with provided state', () => {
      // Arrange
      const initialState = [[true, false], [false, true]];

      // Act
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Assert
      expect(result.current.state).toEqual(initialState);
    });

    it('should have canUndo as false initially', () => {
      // Arrange
      const initialState = [[true]];

      // Act
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Assert
      expect(result.current.canUndo).toBe(false);
    });

    it('should have canRedo as false initially', () => {
      // Arrange
      const initialState = [[true]];

      // Act
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Assert
      expect(result.current.canRedo).toBe(false);
    });
  });

  describe('setState', () => {
    it('should update state when setState is called', () => {
      // Arrange
      const initialState = [[true]];
      const newState = [[false]];
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Act
      act(() => {
        result.current.setState(newState);
      });

      // Assert
      expect(result.current.state).toEqual(newState);
    });

    it('should enable undo after setState', () => {
      // Arrange
      const initialState = [[true]];
      const newState = [[false]];
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Act
      act(() => {
        result.current.setState(newState);
      });

      // Assert
      expect(result.current.canUndo).toBe(true);
    });

    it('should clear redo history after setState', () => {
      // Arrange
      const initialState = [[true]];
      const { result } = renderHook(() => useUndoRedo(initialState));
      act(() => {
        result.current.setState([[false]]);
        result.current.undo();
      });

      // Act
      act(() => {
        result.current.setState([[true, true]]);
      });

      // Assert
      expect(result.current.canRedo).toBe(false);
    });
  });

  describe('undo', () => {
    it('should revert to previous state on undo', () => {
      // Arrange
      const initialState = [[true]];
      const newState = [[false]];
      const { result } = renderHook(() => useUndoRedo(initialState));
      act(() => {
        result.current.setState(newState);
      });

      // Act
      act(() => {
        result.current.undo();
      });

      // Assert
      expect(result.current.state).toEqual(initialState);
    });

    it('should enable redo after undo', () => {
      // Arrange
      const initialState = [[true]];
      const { result } = renderHook(() => useUndoRedo(initialState));
      act(() => {
        result.current.setState([[false]]);
      });

      // Act
      act(() => {
        result.current.undo();
      });

      // Assert
      expect(result.current.canRedo).toBe(true);
    });

    it('should do nothing when undo is called with no history', () => {
      // Arrange
      const initialState = [[true]];
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Act
      act(() => {
        result.current.undo();
      });

      // Assert
      expect(result.current.state).toEqual(initialState);
    });

    it('should handle multiple undos', () => {
      // Arrange
      const state1 = [[true]];
      const state2 = [[false]];
      const state3 = [[true, true]];
      const { result } = renderHook(() => useUndoRedo(state1));
      act(() => {
        result.current.setState(state2);
        result.current.setState(state3);
      });

      // Act
      act(() => {
        result.current.undo();
        result.current.undo();
      });

      // Assert
      expect(result.current.state).toEqual(state1);
    });
  });

  describe('redo', () => {
    it('should restore undone state on redo', () => {
      // Arrange
      const initialState = [[true]];
      const newState = [[false]];
      const { result } = renderHook(() => useUndoRedo(initialState));
      act(() => {
        result.current.setState(newState);
        result.current.undo();
      });

      // Act
      act(() => {
        result.current.redo();
      });

      // Assert
      expect(result.current.state).toEqual(newState);
    });

    it('should do nothing when redo is called with no redo history', () => {
      // Arrange
      const initialState = [[true]];
      const { result } = renderHook(() => useUndoRedo(initialState));

      // Act
      act(() => {
        result.current.redo();
      });

      // Assert
      expect(result.current.state).toEqual(initialState);
    });

    it('should handle multiple redos', () => {
      // Arrange
      const state1 = [[true]];
      const state2 = [[false]];
      const state3 = [[true, true]];
      const { result } = renderHook(() => useUndoRedo(state1));
      act(() => {
        result.current.setState(state2);
        result.current.setState(state3);
        result.current.undo();
        result.current.undo();
      });

      // Act
      act(() => {
        result.current.redo();
        result.current.redo();
      });

      // Assert
      expect(result.current.state).toEqual(state3);
    });
  });

  describe('reset', () => {
    it('should reset to initial state', () => {
      // Arrange
      const initialState = [[true]];
      const { result } = renderHook(() => useUndoRedo(initialState));
      act(() => {
        result.current.setState([[false]]);
        result.current.setState([[true, true]]);
      });

      // Act
      act(() => {
        result.current.reset();
      });

      // Assert
      expect(result.current.state).toEqual(initialState);
    });

    it('should clear history on reset', () => {
      // Arrange
      const initialState = [[true]];
      const { result } = renderHook(() => useUndoRedo(initialState));
      act(() => {
        result.current.setState([[false]]);
      });

      // Act
      act(() => {
        result.current.reset();
      });

      // Assert
      expect(result.current.canUndo).toBe(false);
      expect(result.current.canRedo).toBe(false);
    });
  });
});
