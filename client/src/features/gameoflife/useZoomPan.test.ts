import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useZoomPan } from './useZoomPan';

describe('useZoomPan', () => {
  describe('drag threshold behavior', () => {
    it('should not mark as dragged if movement is below threshold', () => {
      const { result } = renderHook(() => useZoomPan({ dragThreshold: 5 }));

      // Simulate mouse down
      const mouseDownEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent);
      });

      // Simulate small mouse move (below threshold)
      const mouseMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 103, // 3px movement (below 5px threshold)
        clientY: 103,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent);
      });

      // Should not be marked as dragged
      expect(result.current.getHasDragged()).toBe(false);
    });

    it('should mark as dragged if movement exceeds threshold', () => {
      const { result } = renderHook(() => useZoomPan({ dragThreshold: 5 }));

      // Simulate mouse down
      const mouseDownEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent);
      });

      // Simulate large mouse move (above threshold)
      const mouseMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 110, // 10px movement (above 5px threshold)
        clientY: 110,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent);
      });

      // Should be marked as dragged
      expect(result.current.getHasDragged()).toBe(true);
    });

    it('should reset hasDragged on subsequent mouse down', () => {
      const { result } = renderHook(() => useZoomPan({ dragThreshold: 5 }));

      // First drag session - large movement
      const mouseDownEvent1 = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent1);
      });

      const mouseMoveEvent1 = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 120,
        clientY: 120,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent1);
      });

      expect(result.current.getHasDragged()).toBe(true);

      // Mouse up
      act(() => {
        result.current.handleMouseUp();
      });

      // Second drag session - should reset
      const mouseDownEvent2 = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 200,
        clientY: 200,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent2);
      });

      // hasDragged should be reset to false
      expect(result.current.getHasDragged()).toBe(false);
    });

    it('should calculate distance using euclidean formula', () => {
      const { result } = renderHook(() => useZoomPan({ dragThreshold: 5 }));

      const mouseDownEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent);
      });

      // Move 3px horizontally and 4px vertically
      // Distance = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5
      // This should exactly match the threshold
      const mouseMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 103,
        clientY: 104,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent);
      });

      // Should be marked as dragged (distance === threshold)
      expect(result.current.getHasDragged()).toBe(false);

      // Move one more pixel to exceed threshold
      const mouseMoveEvent2 = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 104,
        clientY: 104,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent2);
      });

      expect(result.current.getHasDragged()).toBe(true);
    });
  });

  describe('touch drag threshold behavior', () => {
    it('should not mark as dragged for small touch movements', () => {
      const { result } = renderHook(() => useZoomPan({ dragThreshold: 5 }));

      const touchStartEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent<HTMLDivElement>;

      act(() => {
        result.current.handleTouchStart!(touchStartEvent);
      });

      const touchMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        touches: [{ clientX: 103, clientY: 103 }],
      } as unknown as React.TouchEvent<HTMLDivElement>;

      act(() => {
        result.current.handleTouchMove!(touchMoveEvent);
      });

      expect(result.current.getHasDragged()).toBe(false);
    });

    it('should mark as dragged for large touch movements', () => {
      const { result } = renderHook(() => useZoomPan({ dragThreshold: 5 }));

      const touchStartEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        touches: [{ clientX: 100, clientY: 100 }],
      } as unknown as React.TouchEvent<HTMLDivElement>;

      act(() => {
        result.current.handleTouchStart!(touchStartEvent);
      });

      const touchMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        touches: [{ clientX: 115, clientY: 115 }],
      } as unknown as React.TouchEvent<HTMLDivElement>;

      act(() => {
        result.current.handleTouchMove!(touchMoveEvent);
      });

      expect(result.current.getHasDragged()).toBe(true);
    });
  });

  describe('pan functionality', () => {
    it('should update pan position on drag', () => {
      const { result } = renderHook(() => useZoomPan());

      const mouseDownEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent);
      });

      const mouseMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 150,
        clientY: 120,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent);
      });

      expect(result.current.panX).toBe(50);
      expect(result.current.panY).toBe(20);
    });

    it('should set isDragging to true during drag', () => {
      const { result } = renderHook(() => useZoomPan());

      expect(result.current.isDragging).toBe(false);

      const mouseDownEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent);
      });

      expect(result.current.isDragging).toBe(true);

      act(() => {
        result.current.handleMouseUp();
      });

      expect(result.current.isDragging).toBe(false);
    });
  });

  describe('zoom functionality', () => {
    it('should respect min and max zoom bounds', () => {
      const { result } = renderHook(() => useZoomPan({ minZoom: 0.5, maxZoom: 3 }));

      // Try to zoom out below minimum
      act(() => {
        result.current.zoomOut();
        result.current.zoomOut();
        result.current.zoomOut();
        result.current.zoomOut();
        result.current.zoomOut();
      });

      expect(result.current.zoom).toBeGreaterThanOrEqual(0.5);

      // Reset and try to zoom in above maximum
      act(() => {
        result.current.resetView();
      });

      act(() => {
        result.current.zoomIn();
        result.current.zoomIn();
        result.current.zoomIn();
        result.current.zoomIn();
        result.current.zoomIn();
        result.current.zoomIn();
        result.current.zoomIn();
        result.current.zoomIn();
      });

      expect(result.current.zoom).toBeLessThanOrEqual(3);
    });

    it('should reset view to initial state', () => {
      const { result } = renderHook(() => useZoomPan());

      // Change zoom and pan
      act(() => {
        result.current.zoomIn();
      });

      const mouseDownEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseDown(mouseDownEvent);
      });

      const mouseMoveEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        clientX: 150,
        clientY: 150,
      } as React.MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleMouseMove(mouseMoveEvent);
      });

      // Reset
      act(() => {
        result.current.resetView();
      });

      expect(result.current.zoom).toBe(1);
      expect(result.current.panX).toBe(0);
      expect(result.current.panY).toBe(0);
    });
  });
});
