import { expect, afterEach } from 'vitest';
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

// Only add it if JSDOM hasn't already provided one
if (!('ResizeObserver' in globalThis)) {
  // @ts-expect-error - intentional test polyfill
  globalThis.ResizeObserver = ResizeObserverMock;
}