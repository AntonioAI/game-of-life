import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PatternSelector from "./PatternSelector";
import { PATTERNS } from "./patterns";

describe("PatternSelector", () => {
  // Helper: the first button is always the pattern selector trigger
  const openPatternMenu = () => {
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // pattern selector (not the Load button)
  };

  it("should filter patterns by ruleset by default", () => {
    const mockOnLoadPattern = vi.fn();
    const currentRuleset = "B35/S236"; // HighLife

    render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={currentRuleset}
      />
    );

    // Open dropdown
    openPatternMenu();

    const highLifePatterns = PATTERNS.filter(
      (p) => p.ruleset === "B35/S236"
    );
    const gameOfLifePatterns = PATTERNS.filter(
      (p) => !p.ruleset || p.ruleset === "B3/S23"
    );

    // HighLife patterns SHOULD be visible
    highLifePatterns.forEach((pattern) => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });

    // Conway patterns should NOT be visible by default
    gameOfLifePatterns.forEach((pattern) => {
      expect(screen.queryByText(pattern.name)).not.toBeInTheDocument();
    });
  });

  it("should show all patterns when checkbox is checked", () => {
    const mockOnLoadPattern = vi.fn();
    const currentRuleset = "B35/S236"; // HighLife

    render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={currentRuleset}
      />
    );

    openPatternMenu();

    const checkbox = screen.getByRole("checkbox", {
      name: /all rulesets/i,
    });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Now all patterns should be visible
    PATTERNS.forEach((pattern) => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });
  });

  it("should update filtered patterns when ruleset changes", () => {
    const mockOnLoadPattern = vi.fn();
    const conwayRuleset = "B3/S23";
    const dayNightRuleset = "B3678/S34678";

    const { rerender } = render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={conwayRuleset}
      />
    );

    // --- Conway ---
    openPatternMenu();

    const conwayPatterns = PATTERNS.filter(
      (p) => !p.ruleset || p.ruleset === "B3/S23"
    );

    conwayPatterns.forEach((pattern) => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });

    // Close menu
    openPatternMenu();

    // --- Switch to Day & Night ---
    rerender(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={dayNightRuleset}
      />
    );

    openPatternMenu();

    const dayNightPatterns = PATTERNS.filter(
      (p) => p.ruleset === "B3678/S34678"
    );

    dayNightPatterns.forEach((pattern) => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });
  });

  it("should call onLoadPattern when load button is clicked", () => {
    const mockOnLoadPattern = vi.fn();
    const currentRuleset = "B3/S23";

    render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={currentRuleset}
      />
    );

    const loadButton = screen.getByRole("button", { name: /^load$/i });
    fireEvent.click(loadButton);

    expect(mockOnLoadPattern).toHaveBeenCalledTimes(1);
    expect(mockOnLoadPattern).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.any(String),
        cells: expect.any(Array),
      }),
      expect.any(Number),
      expect.any(Number)
    );
  });

  it("should preserve checkbox state when ruleset changes", () => {
    const mockOnLoadPattern = vi.fn();
    const conwayRuleset = "B3/S23";
    const highlifeRuleset = "B35/S236";

    const { rerender } = render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={conwayRuleset}
      />
    );

    openPatternMenu();

    const checkbox = screen.getByRole("checkbox", {
      name: /all rulesets/i,
    });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Close menu
    openPatternMenu();

    // Change ruleset
    rerender(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={highlifeRuleset}
      />
    );

    openPatternMenu();

    const newCheckbox = screen.getByRole("checkbox", {
      name: /all rulesets/i,
    });

    expect(newCheckbox).toBeChecked();

    // With "All rulesets" on, every pattern should appear
    PATTERNS.forEach((pattern) => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });
  });
});
