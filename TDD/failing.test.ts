import { describe, it, expect } from "vitest";

describe("Intentional failing test", () => {
  it("should fail on purpose", () => {
    expect(1 + 1).toBe(3);
  });
});