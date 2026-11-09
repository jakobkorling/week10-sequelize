import { describe, test, expect } from "vitest";
import {
  findBook,
  checkOutBook,
  registerLoan,
  borrowBook,
} from "./library";

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

  test("checkOutBook returns a number", () => {
    const book = {
    title: "dune",
    copiesAvailable: 3,
  };
    const result = checkOutBook(book);

    expect(typeof result).toBe("number");
  });

  test("checkOutBook returns a whole number", () => {
    const book = {
    title: "dune",
    copiesAvailable: 3,
    };

    const result = checkOutBook(book);

    expect(Number.isInteger(result)).toBe(true);
  });

  test("checkOutBook returns an ID between 1000 and 9999", () => {
    const book = {
    title: "dune",
    copiesAvailable: 3,
    };

    const result = checkOutBook(book);

    expect(result).toBeGreaterThanOrEqual(1000);
    expect(result).toBeLessThanOrEqual(9999);
  });

  test("checkOutBook throws when no copies are available", () => {
    const book = {
    title: "foundation",
    copiesAvailable: 0,
    };

    expect(() => checkOutBook(book)).toThrow("No copies available");
  });

  test("checkOutBook throws when copiesAvailable is missing", () => {
    const book = {
    title: "dune",
    };

    expect(() => checkOutBook(book)).toThrow();
  });

  test("registerLoan returns a valid loan", () => {
    const result = registerLoan(1234, "dune", 7);

    expect(result).toEqual({
    loanId: 1234,
    title: "dune",
    memberId: 7,
    });
  });

  test("registerLoan throws when memberId is 0", () => {
    expect(() => registerLoan(1234, "dune", 0)).toThrow();
  });


  test("registerLoan throws when title is invalid", () => {
    expect(() => registerLoan(1234, "harry potter", 7)).toThrow();
  });

  test("borrowBook returns a valid loan", () => {
    const result = borrowBook("dune", 7);

    expect(result.title).toBe("dune");
    expect(result.memberId).toBe(7);
    expect(result.loanId).toBeGreaterThanOrEqual(1000);
    expect(result.loanId).toBeLessThanOrEqual(9999);
  });
});

