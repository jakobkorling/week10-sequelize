import { describe, it, expect } from "vitest";

describe("Branch protection test", () => {
  it("should fail on purpose", () => {
    expect(1 + 1).toBe(3);
  });
});