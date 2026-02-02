import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FloatingSimulationControls from './FloatingSimulationControls';

describe('FloatingSimulationControls', () => {
  const mockProps = {
    isRunning: false,
    speed: 50,
    canStepBack: false,
    onToggleSimulation: vi.fn(),
    onStep: vi.fn(),
    onStepBack: vi.fn(),
    onReset: vi.fn(),
    onRandomize: vi.fn(),
    onSpeedChange: vi.fn(),
  };

  it('renders all control buttons', () => {
    render(
      <FloatingSimulationControls
        isRunning={false}
        speed={100}
        canStepBack={false}
        onToggleSimulation={vi.fn()}
        onStep={vi.fn()}
        onStepBack={vi.fn()}
        onReset={vi.fn()}
        onRandomize={vi.fn()}
        onSpeedChange={vi.fn()}
      />
    );
    expect(screen.getByTitle(/play/i)).toBeInTheDocument();
    expect(screen.getByTitle(/step/i)).toBeInTheDocument();
    expect(screen.getByTitle(/step back/i)).toBeInTheDocument();
    expect(screen.getByTitle(/reset/i)).toBeInTheDocument();
    expect(screen.getByTitle(/randomize/i)).toBeInTheDocument();
  });

  it('shows Play button when not running', () => {
    render(<FloatingSimulationControls {...mockProps} isRunning={false} />);
    
    expect(screen.getByTitle('Play')).toBeInTheDocument();
    expect(screen.queryByTitle('Pause')).not.toBeInTheDocument();
  });

  it('shows Pause button when running', () => {
    render(<FloatingSimulationControls {...mockProps} isRunning={true} />);
    
    expect(screen.getByTitle('Pause')).toBeInTheDocument();
    expect(screen.queryByTitle('Play')).not.toBeInTheDocument();
  });

  it('calls onToggleSimulation when play/pause is clicked', async () => {
    const user = userEvent.setup();
    render(<FloatingSimulationControls {...mockProps} />);
    
    await user.click(screen.getByTitle('Play'));
    expect(mockProps.onToggleSimulation).toHaveBeenCalledTimes(1);
  });

  it('calls onStep when step button is clicked', async () => {
    const mockStep = vi.fn();
    render(
      <FloatingSimulationControls
        isRunning={false}
        speed={100}
        canStepBack={false}
        onToggleSimulation={vi.fn()}
        onStep={mockStep}
        onStepBack={vi.fn()}
        onReset={vi.fn()}
        onRandomize={vi.fn()}
        onSpeedChange={vi.fn()}
      />
    );
    await userEvent.click(screen.getByTitle(/step/i));
    expect(mockStep).toHaveBeenCalled();
  });

  it('calls onReset when reset button is clicked', async () => {
    const mockReset = vi.fn();
    render(
      <FloatingSimulationControls
        isRunning={false}
        speed={100}
        canStepBack={false}
        onToggleSimulation={vi.fn()}
        onStep={vi.fn()}
        onStepBack={vi.fn()}
        onReset={mockReset}
        onRandomize={vi.fn()}
        onSpeedChange={vi.fn()}
      />
    );
    await userEvent.click(screen.getByTitle(/reset/i));
    expect(mockReset).toHaveBeenCalled();
  });

  it('calls onRandomize when randomize button is clicked', async () => {
    const mockRandomize = vi.fn();
    render(
      <FloatingSimulationControls
        isRunning={false}
        speed={100}
        canStepBack={false}
        onToggleSimulation={vi.fn()}
        onStep={vi.fn()}
        onStepBack={vi.fn()}
        onReset={vi.fn()}
        onRandomize={mockRandomize}
        onSpeedChange={vi.fn()}
      />
    );
    await userEvent.click(screen.getByTitle(/randomize/i));
    expect(mockRandomize).toHaveBeenCalled();
  });

  it('disables step button when simulation is running', () => {
    render(
      <FloatingSimulationControls
        isRunning={true}
        speed={100}
        canStepBack={false}
        onToggleSimulation={vi.fn()}
        onStep={vi.fn()}
        onStepBack={vi.fn()}
        onReset={vi.fn()}
        onRandomize={vi.fn()}
        onSpeedChange={vi.fn()}
      />
    );
    expect(screen.getByTitle(/step/i)).toBeDisabled();
  });

  it('enables step button when simulation is paused', () => {
    render(
      <FloatingSimulationControls
        isRunning={false}
        speed={100}
        canStepBack={false}
        onToggleSimulation={vi.fn()}
        onStep={vi.fn()}
        onStepBack={vi.fn()}
        onReset={vi.fn()}
        onRandomize={vi.fn()}
        onSpeedChange={vi.fn()}
      />
    );
    expect(screen.getByTitle(/step/i)).not.toBeDisabled();
  });

  it('enables step button when simulation is not running', () => {
    render(<FloatingSimulationControls {...mockProps} isRunning={false} />);
    
    expect(screen.getByTitle('Step')).not.toBeDisabled();
  });

  it('displays the current speed', () => {
    render(<FloatingSimulationControls {...mockProps} speed={100} />);
    
    expect(screen.getByText('10x')).toBeInTheDocument();
  });

  it('renders speed slider', () => {
    render(<FloatingSimulationControls {...mockProps} />);
    
    expect(screen.getByText(/Speed:/)).toBeInTheDocument();
  });
});
