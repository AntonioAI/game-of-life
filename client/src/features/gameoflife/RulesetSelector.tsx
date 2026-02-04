import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { RULESETS, type Ruleset, getRulesetByNotation } from './rulesets';

interface RulesetSelectorProps {
  currentRuleset: Ruleset;
  onRulesetChange: (ruleset: Ruleset) => void;
}

function RulesetSelector({ currentRuleset, onRulesetChange }: RulesetSelectorProps) {
  function handleRulesetChange(value: string) {
    const ruleset = getRulesetByNotation(value);
    if (ruleset) {
      onRulesetChange(ruleset);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Ruleset
        </label>
        <Select value={currentRuleset.notation} onValueChange={handleRulesetChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{currentRuleset.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {currentRuleset.notation}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {RULESETS.map((ruleset) => (
              <SelectItem key={ruleset.notation} value={ruleset.notation}>
                <div className="flex items-center justify-between min-w-[200px]">
                  <span className="font-medium">{ruleset.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                    {ruleset.notation}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {currentRuleset.name}
          </span>
          <span className="text-xs font-mono text-blue-600 dark:text-cyan-400">
            {currentRuleset.notation}
          </span>
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300">
          {currentRuleset.description}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Birth: </span>
            <span className="text-gray-700 dark:text-gray-300">
              {currentRuleset.birth.length > 0 ? currentRuleset.birth.join(', ') : 'None'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Survival: </span>
            <span className="text-gray-700 dark:text-gray-300">
              {currentRuleset.survival.length > 0 ? currentRuleset.survival.join(', ') : 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesetSelector;
