import { useState, useCallback, useRef } from 'react';

interface UseZoomPanOptions {
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  dragThreshold?: number;
}

export function useZoomPan(options: UseZoomPanOptions = {}) {
  const { minZoom = 0.5, maxZoom = 10, zoomStep = 0.2, dragThreshold = 5 } = options;
  
  // Initialize refs first to maintain consistent hook order
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  
  // Then state hooks
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent default browser zoom behavior
    e.preventDefault();
    e.stopPropagation();
    
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    setZoom((prevZoom) => {
      const newZoom = prevZoom + delta;
      return Math.max(minZoom, Math.min(maxZoom, newZoom));
    });
  }, [minZoom, maxZoom, zoomStep]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent text selection and other default behaviors
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { x: panX, y: panY };
  }, [panX, panY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    e.stopPropagation();
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // Check if movement exceeds threshold
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > dragThreshold) {
      hasDraggedRef.current = true;
    }
    
    setPanX(panStartRef.current.x + deltaX);
    setPanY(panStartRef.current.y + deltaY);
  }, [isDragging, dragThreshold]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    // Prevent default browser touch behaviors
    e.preventDefault();
    e.stopPropagation();
    
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };
      panStartRef.current = { x: panX, y: panY };
    }
  }, [panX, panY]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    // Prevent default to stop scrolling the page
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    
    // Check if movement exceeds threshold
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > dragThreshold) {
      hasDraggedRef.current = true;
    }
    
    setPanX(panStartRef.current.x + deltaX);
    setPanY(panStartRef.current.y + deltaY);
  }, [isDragging, dragThreshold]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(maxZoom, prevZoom + zoomStep));
  }, [maxZoom, zoomStep]);

  const zoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(minZoom, prevZoom - zoomStep));
  }, [minZoom, zoomStep]);

  const getHasDragged = useCallback(() => {
    return hasDraggedRef.current;
  }, []);

  return {
    zoom,
    panX,
    panY,
    isDragging,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetView,
    zoomIn,
    zoomOut,
    getHasDragged,
  };
}
