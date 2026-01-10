import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PatternSelector from "./PatternSelector";
import { PATTERNS } from "./patterns";
import { RULESETS } from "./rulesets";

describe("PatternSelector", () => {
  it("should filter patterns by ruleset by default", () => {
    // Arrange
    const mockOnLoadPattern = vi.fn();
    const currentRuleset = "B35/S236"; // HighLife

    // Act
    render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={currentRuleset}
      />
    );

    // Open the pattern dropdown
    const patternButton = screen.getByRole("button", { name: /replicator/i });
    fireEvent.click(patternButton);

    // Assert - Should only show HighLife patterns by default
    const highLifePatterns = PATTERNS.filter(p => p.ruleset === "B35/S236");
    const gameOfLifePatterns = PATTERNS.filter(p => !p.ruleset || p.ruleset === "B3/S23");

    // HighLife patterns should be visible
    highLifePatterns.forEach(pattern => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });

    // Game of Life patterns should NOT be visible (unless checkbox is checked)
    gameOfLifePatterns.forEach(pattern => {
      expect(screen.queryByText(pattern.name)).not.toBeInTheDocument();
    });
  });

  it("should show all patterns when checkbox is checked", () => {
    // Arrange
    const mockOnLoadPattern = vi.fn();
    const currentRuleset = "B35/S236"; // HighLife

    // Act
    render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={currentRuleset}
      />
    );

    // Open the pattern dropdown
    const patternButton = screen.getByRole("button", { name: /replicator/i });
    fireEvent.click(patternButton);

    // Check the "Show all patterns" checkbox
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Assert - Should show patterns from all rulesets
    const allPatterns = PATTERNS;
    expect(allPatterns.length).toBeGreaterThan(0);

    // All patterns should be visible
    allPatterns.forEach(pattern => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });
  });

  it("should update filtered patterns when ruleset changes", () => {
    // Arrange
    const mockOnLoadPattern = vi.fn();
    const conwayRuleset = "B3/S23";
    const dayNightRuleset = "B3678/S34678";

    // Act - Initial render with Conway's Game of Life
    const { rerender } = render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={conwayRuleset}
      />
    );

    // Open the pattern dropdown
    let patternButton = screen.getByRole("button", { name: /glider/i });
    fireEvent.click(patternButton);

    // Assert - Should show Conway patterns
    const conwayPatterns = PATTERNS.filter(p => !p.ruleset || p.ruleset === "B3/S23");
    conwayPatterns.forEach(pattern => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });

    // Close dropdown
    fireEvent.click(patternButton);

    // Act - Rerender with Day & Night ruleset
    rerender(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={dayNightRuleset}
      />
    );

    // Open the pattern dropdown again
    patternButton = screen.getByRole("button", { name: /diamond/i });
    fireEvent.click(patternButton);

    // Assert - Should show Day & Night patterns
    const dayNightPatterns = PATTERNS.filter(p => p.ruleset === "B3678/S34678");
    dayNightPatterns.forEach(pattern => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });
  });

  it("should call onLoadPattern when load button is clicked", () => {
    // Arrange
    const mockOnLoadPattern = vi.fn();
    const currentRuleset = "B3/S23";

    // Act
    render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={currentRuleset}
      />
    );

    // Click the Load button
    const loadButton = screen.getByRole("button", { name: /load/i });
    fireEvent.click(loadButton);

    // Assert - Should be called with a pattern and position
    expect(mockOnLoadPattern).toHaveBeenCalled();
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
    // Arrange
    const mockOnLoadPattern = vi.fn();
    const conwayRuleset = "B3/S23";
    const highlifeRuleset = "B35/S236";

    // Act
    const { rerender } = render(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={conwayRuleset}
      />
    );

    // Open dropdown and check the "Show all patterns" checkbox
    const patternButton = screen.getByRole("button", { name: /glider/i });
    fireEvent.click(patternButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Assert - Checkbox should be checked
    expect(checkbox).toBeChecked();

    // Close dropdown
    fireEvent.click(patternButton);

    // Rerender with different ruleset
    rerender(
      <PatternSelector
        onLoadPattern={mockOnLoadPattern}
        gridWidth={50}
        gridHeight={50}
        currentRuleset={highlifeRuleset}
      />
    );

    // Open dropdown again
    const newPatternButton = screen.getByRole("button", { name: /replicator/i });
    fireEvent.click(newPatternButton);

    const newCheckbox = screen.getByRole("checkbox");

    // Assert - Checkbox should still be checked
    expect(newCheckbox).toBeChecked();

    // Should show patterns from all rulesets
    const allPatterns = PATTERNS;
    allPatterns.forEach(pattern => {
      expect(screen.getByText(pattern.name)).toBeInTheDocument();
    });
  });
});
