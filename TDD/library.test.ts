import { describe, test, expect } from "vitest";
import { findBook } from "./library";

describe("Library Unit Tests", () => {
  test("findBook returns dune with 3 copies", () => {
    const result = findBook("dune");

    expect(result).toEqual({
      title: "dune",
      copiesAvailable: 3,
    });
  });

  test("findBook returns foundation with 0 copies", () => {
    const result = findBook("foundation");

    expect(result).toEqual({
        title: "foundation",
        copiesAvailable: 0,
    });
  });

  test("findBook throws for unknown book", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("findBook throws when title is a number", () => {
    expect(() => findBook(42)).toThrow();
  });
});

