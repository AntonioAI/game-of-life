import { describe, it, expect, vi, afterEach } from "vitest";
import {
  saveGridState,
  loadGridState,
  getSavedStates,
  deleteSavedState,
} from "./gridStateManager";

describe("gridStateManager", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe("saveGridState", () => {
    it("should save a grid state to localStorage", () => {
      // Arrange
      const name = "test-state";
      const grid = [
        [true, false],
        [false, true],
      ];
      const generation = 5;

      // Act
      saveGridState(name, grid, generation);
      const saved = localStorage.getItem(`game-of-life-state-${name}`);

      // Assert
      expect(saved).toBeTruthy();
      const parsed = JSON.parse(saved!);
      expect(parsed.grid).toEqual(grid);
      expect(parsed.generation).toBe(generation);
    });

    it("should include timestamp when saving", () => {
      // Arrange
      const name = "test-timestamp";
      const grid = [[true]];
      const generation = 0;
      const before = Date.now();

      // Act
      saveGridState(name, grid, generation);
      const saved = JSON.parse(
        localStorage.getItem(`game-of-life-state-${name}`)!
      );
      const after = Date.now();

      // Assert
      expect(saved.timestamp).toBeGreaterThanOrEqual(before);
      expect(saved.timestamp).toBeLessThanOrEqual(after);
    });
  });

  describe("loadGridState", () => {
    it("should load a previously saved grid state", () => {
      // Arrange
      const name = "test-load";
      const grid = [[true, false, true]];
      const generation = 10;
      saveGridState(name, grid, generation);

      // Act
      const loaded = loadGridState(name);

      // Assert
      expect(loaded).toBeTruthy();
      expect(loaded!.grid).toEqual(grid);
      expect(loaded!.generation).toBe(generation);
    });

    it("should return null for non-existent state", () => {
      // Arrange
      const name = "non-existent";

      // Act
      const loaded = loadGridState(name);

      // Assert
      expect(loaded).toBeNull();
    });

    it("should return null for invalid JSON", () => {
      // Arrange
      const name = "invalid-json";
      localStorage.setItem(`game-of-life-state-${name}`, "invalid-json");

      // Act
      const loaded = loadGridState(name);

      // Assert
      expect(loaded).toBeNull();
    });
  });

  describe("getSavedStates", () => {
    it("should return all saved states", () => {
      // Arrange
      saveGridState("state1", [[true]], 1);
      saveGridState("state2", [[false]], 2);

      // Act
      const states = getSavedStates();

      // Assert
      expect(states).toHaveLength(2);
      expect(states.map((s) => s.name).sort()).toEqual(["state1", "state2"]);
    });

    it("should return empty array when no states exist", () => {
      // Act
      const states = getSavedStates();

      // Assert
      expect(states).toEqual([]);
    });

    it("should only return game-of-life states", () => {
      // Arrange
      localStorage.setItem("other-key", "value");
      saveGridState("state1", [[true]], 1);

      // Act
      const states = getSavedStates();

      // Assert
      expect(states).toHaveLength(1);
      expect(states[0].name).toBe("state1");
    });

    it("should sort states by timestamp descending", () => {
      // Arrange
      const nowSpy = vi.spyOn(Date, "now");

      nowSpy.mockReturnValueOnce(1000); // "old"
      saveGridState("old", [[true]], 1);

      nowSpy.mockReturnValueOnce(2000); // "new"
      saveGridState("new", [[false]], 2);

      // Act
      const states = getSavedStates();

      // Assert
      expect(states[0].name).toBe("new");
      expect(states[1].name).toBe("old");
    });
  });

  describe("deleteSavedState", () => {
    it("should delete a saved state", () => {
      // Arrange
      const name = "test-delete";
      saveGridState(name, [[true]], 1);

      // Act
      deleteSavedState(name);
      const loaded = loadGridState(name);

      // Assert
      expect(loaded).toBeNull();
    });

    it("should not throw when deleting non-existent state", () => {
      // Arrange
      const name = "non-existent";

      // Act & Assert
      expect(() => deleteSavedState(name)).not.toThrow();
    });
  });
});
