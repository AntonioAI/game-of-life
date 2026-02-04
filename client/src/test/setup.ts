import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// ----------------------------------------------------
// ResizeObserver polyfill for JSDOM (required by Radix UI)
// ----------------------------------------------------
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('ResizeObserver' in globalThis)) {
  // @ts-expect-error - intentional test polyfill
  globalThis.ResizeObserver = ResizeObserverMock;
}

// ----------------------------------------------------
// PointerCapture polyfill for JSDOM (required by Radix Select)
// ----------------------------------------------------
if (!('hasPointerCapture' in Element.prototype)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Element.prototype as any).hasPointerCapture = () => false;
}

if (!('setPointerCapture' in Element.prototype)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Element.prototype as any).setPointerCapture = vi.fn();
}

if (!('releasePointerCapture' in Element.prototype)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Element.prototype as any).releasePointerCapture = vi.fn();
}

// ----------------------------------------------------
// scrollIntoView polyfill for JSDOM (required by Radix Select)
// ----------------------------------------------------
if (!('scrollIntoView' in Element.prototype)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Element.prototype as any).scrollIntoView = () => {};
}
