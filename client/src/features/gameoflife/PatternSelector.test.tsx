import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import PatternSelector from "./PatternSelector";
import { PATTERNS } from "./patterns";

describe("PatternSelector", () => {
  /**
   * Helpers
   */
  const openPatternMenu = () => {
    // First button is the trigger (not "Load")
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
  };

  const closePatternMenu = () => {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
  };

  const getMenu = () => {
    // Menu exists only when open; search input is a stable anchor.
    const searchInput = screen.getByPlaceholderText(/search patterns/i);

    // searchInput is inside the sticky header div,
    // whose parentElement is the menu container div.
    const stickyHeaderDiv = searchInput.closest("div");
    const menu = stickyHeaderDiv?.parentElement;

    if (!menu) {
      throw new Error("Could not locate the pattern dropdown menu container");
    }

    return menu;
  };

  const getVisiblePatternButtons = () => {
    const menu = getMenu();
    // Pattern items are buttons in the menu content area
    return within(menu).getAllByRole("button");
  };

  /**
   * Mirrors the component’s ruleset filtering logic, so tests can pick a valid “other pattern”.
   */
  const patternsForRuleset = (ruleset: string, showAllPatterns: boolean) => {
    if (showAllPatterns) return PATTERNS;

    if (ruleset === "B3/S23") {
      return PATTERNS.filter((p) => !p.ruleset || p.ruleset === "B3/S23");
    }

    return PATTERNS.filter((p) => p.ruleset === ruleset);
  };

  it("renders the selector and Load button", () => {
    render(
      <PatternSelector
        onLoadPattern={vi.fn()}
        gridWidth={50}
        gridHeight={30}
        currentRuleset="B3/S23"
      />
    );

    expect(screen.getByText(/load preset pattern/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /load/i })).toBeInTheDocument();
  });

  it("opens and closes the dropdown menu", () => {
    render(
      <PatternSelector
        onLoadPattern={vi.fn()}
        gridWidth={50}
        gridHeight={30}
        currentRuleset="B3/S23"
      />
    );

    // Closed: no search input
    expect(screen.queryByPlaceholderText(/search patterns/i)).not.toBeInTheDocument();

    // Open
    openPatternMenu();
    expect(screen.getByPlaceholderText(/search patterns/i)).toBeInTheDocument();

    // Close
    closePatternMenu();
    expect(screen.queryByPlaceholderText(/search patterns/i)).not.toBeInTheDocument();
  });

  it("shows 'No patterns found' when search yields zero results", () => {
    render(
      <PatternSelector
        onLoadPattern={vi.fn()}
        gridWidth={50}
        gridHeight={30}
        currentRuleset="B3/S23"
      />
    );

    openPatternMenu();

    const searchInput = screen.getByPlaceholderText(/search patterns/i);
    fireEvent.change(searchInput, { target: { value: "zzzz-no-such-pattern-zzzz" } });

    const menu = getMenu();
    expect(within(menu).getByText(/no patterns found/i)).toBeInTheDocument();
  });

  it("selecting a pattern from the menu updates the trigger text and closes the menu", () => {
    const onLoadPattern = vi.fn();

    render(
      <PatternSelector
        onLoadPattern={onLoadPattern}
        gridWidth={50}
        gridHeight={30}
        currentRuleset="B3/S23"
      />
    );

    // Determine what the component should show by default for this ruleset
    const valid = patternsForRuleset("B3/S23", false);
    expect(valid.length).toBeGreaterThan(0);

    const defaultPattern = valid[0];
    const nextPattern = valid[1] ?? valid[0];

    // Trigger should show the default pattern name
    expect(screen.getByRole("button", { name: defaultPattern.name })).toBeInTheDocument();

    openPatternMenu();

    // Click another pattern (or the same if only one exists)
    const menu = getMenu();
    const option = within(menu).getByText(nextPattern.name);
    fireEvent.click(option);

    // Menu should close
    expect(screen.queryByPlaceholderText(/search patterns/i)).not.toBeInTheDocument();

    // Trigger should show the newly selected pattern
    expect(screen.getByRole("button", { name: nextPattern.name })).toBeInTheDocument();
  });

  it("clicking Load calls onLoadPattern with centered placement", () => {
    const onLoadPattern = vi.fn();

    const gridWidth = 20;
    const gridHeight = 10;

    render(
      <PatternSelector
        onLoadPattern={onLoadPattern}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        currentRuleset="B3/S23"
      />
    );

    // Use whichever pattern the component defaults to for this ruleset
    const valid = patternsForRuleset("B3/S23", false);
    const pattern = valid[0];

    // Click Load
    fireEvent.click(screen.getByRole("button", { name: /load/i }));

    // Compute expected centering exactly like the component
    const rows = pattern.cells.map(([r]) => r);
    const cols = pattern.cells.map(([, c]) => c);

    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minCol = Math.min(...cols);
    const maxCol = Math.max(...cols);

    const patternHeight = maxRow - minRow + 1;
    const patternWidth = maxCol - minCol + 1;

    const expectedStartRow = Math.floor((gridHeight - patternHeight) / 2) - minRow;
    const expectedStartCol = Math.floor((gridWidth - patternWidth) / 2) - minCol;

    expect(onLoadPattern).toHaveBeenCalledTimes(1);
    expect(onLoadPattern).toHaveBeenCalledWith(pattern, expectedStartRow, expectedStartCol);
  });

  it("updates default selection when currentRuleset changes", () => {
    const onLoadPattern = vi.fn();

    const { rerender } = render(
      <PatternSelector
        onLoadPattern={onLoadPattern}
        gridWidth={50}
        gridHeight={30}
        currentRuleset="B3/S23"
      />
    );

    const conwayValid = patternsForRuleset("B3/S23", false);
    expect(conwayValid.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: conwayValid[0].name })).toBeInTheDocument();

    rerender(
      <PatternSelector
        onLoadPattern={onLoadPattern}
        gridWidth={50}
        gridHeight={30}
        currentRuleset="B36/S23"
      />
    );

    const highlifeValid = patternsForRuleset("B36/S23", false);
    expect(highlifeValid.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: highlifeValid[0].name })).toBeInTheDocument();
  });
});
