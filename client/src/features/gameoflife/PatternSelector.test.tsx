import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import PatternSelector from "./PatternSelector";
import { PATTERNS } from "./patterns";

describe("PatternSelector", () => {
  /**
   * The PatternSelector has two main buttons in the main UI:
   * - The pattern trigger button (shows selectedPattern.name)
   * - The Load button
   *
   * We want tests to interact with the dropdown menu content, NOT the trigger text,
   * because the trigger will always contain some pattern name (e.g. "Glider")
   * even when that pattern is not in the currently filtered dropdown list.
   */

  const openPatternMenu = () => {
    // First button is the trigger (not "Load")
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
  };

  const closePatternMenu = () => {
    // Clicking trigger again closes it
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
  };

  const getMenu = () => {
    // The menu exists only when open; the search input is a stable anchor.
    const searchInput = screen.getByPlaceholderText(/search patterns/i);

    // In the current component structure:
    // searchInput is inside the sticky header div,
    // whose parentElement is the menu container div ("absolute top-full ...").
    const stickyHeaderDiv = searchInput.closest("div");
    const menu = stickyHeaderDiv?.parentElement;

    if (!menu) {
      throw new Error("Could not locate the pattern dropdown menu container");
    }
