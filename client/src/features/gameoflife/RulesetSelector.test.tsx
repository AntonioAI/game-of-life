import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RulesetSelector from './RulesetSelector';
import { RULESETS } from './rulesets';

describe('RulesetSelector', () => {
  it('should display the current ruleset name', () => {
    // Arrange
    const currentRuleset = RULESETS[0]; // Game of Life
    const onRulesetChange = vi.fn();

    // Act
    render(
      <RulesetSelector
        currentRuleset={currentRuleset}
        onRulesetChange={onRulesetChange}
      />
    );

    // Assert
    expect(screen.getByText('Game of Life')).toBeInTheDocument();
  });

  it('should display the current ruleset notation', () => {
    // Arrange
    const currentRuleset = RULESETS[0]; // Game of Life
    const onRulesetChange = vi.fn();

    // Act
    render(
      <RulesetSelector
        currentRuleset={currentRuleset}
        onRulesetChange={onRulesetChange}
      />
    );

    // Assert
    expect(screen.getByText('B3/S23')).toBeInTheDocument();
  });

  it('should display the current ruleset description', () => {
    // Arrange
    const currentRuleset = RULESETS[0]; // Game of Life
    const onRulesetChange = vi.fn();

    // Act
    render(
      <RulesetSelector
        currentRuleset={currentRuleset}
        onRulesetChange={onRulesetChange}
      />
    );

    // Assert
    expect(screen.getByText(/Conway's classic Game of Life/i)).toBeInTheDocument();
  });

  it('should display birth and survival values', () => {
    // Arrange
    const currentRuleset = RULESETS[0]; // Game of Life
    const onRulesetChange = vi.fn();

    // Act
    render(
      <RulesetSelector
        currentRuleset={currentRuleset}
        onRulesetChange={onRulesetChange}
      />
    );

    // Assert
    expect(screen.getByText(/Birth:/)).toBeInTheDocument();
    expect(screen.getByText(/Survival:/)).toBeInTheDocument();
  });

  it('should call onRulesetChange when ruleset is selected', async () => {
    // Arrange
    const user = userEvent.setup();
    const currentRuleset = RULESETS[0]; // Game of Life
    const onRulesetChange = vi.fn();

    render(
      <RulesetSelector
        currentRuleset={currentRuleset}
        onRulesetChange={onRulesetChange}
      />
    );

    // Act
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    // Find HighLife option (B36/S23)
    const highLifeOption = screen.getByText('HighLife').closest('[role="option"]');
    if (highLifeOption) {
      await user.click(highLifeOption);
    }

    // Assert
    expect(onRulesetChange).toHaveBeenCalledWith(RULESETS[1]); // HighLife
  });

  it('should display "None" when birth array is empty', () => {
    // Arrange
    const seedsRuleset = RULESETS.find(r => r.name === 'Seeds')!;
    const onRulesetChange = vi.fn();

    // Act
    render(
      <RulesetSelector
        currentRuleset={seedsRuleset}
        onRulesetChange={onRulesetChange}
      />
    );

    // Assert
    // Seeds has survival: [], so it should show "None" for survival
    const survivalText = screen.getByText(/Survival:/);
    expect(survivalText.parentElement).toHaveTextContent('None');
  });

  it('should update display when currentRuleset prop changes', () => {
    // Arrange
    const onRulesetChange = vi.fn();
    const { rerender } = render(
      <RulesetSelector
        currentRuleset={RULESETS[0]}
        onRulesetChange={onRulesetChange}
      />
    );

    // Act
    rerender(
      <RulesetSelector
        currentRuleset={RULESETS[1]} // HighLife
        onRulesetChange={onRulesetChange}
      />
    );

    // Assert
    expect(screen.getByText('HighLife')).toBeInTheDocument();
    expect(screen.getByText('B36/S23')).toBeInTheDocument();
  });
});
