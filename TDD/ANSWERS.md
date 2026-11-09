## Exercise 1: TypeScript vs Zod

### Why do we need Zod if we already have TypeScript?

TypeScript checks types during development, but it doesn't validate data when the program runs.

Zod validates data at runtime, which is useful when receiving data from users or APIs.

## Exercise 3: toEqual vs toBe

### Why do we use toEqual() instead of toBe() when comparing objects?

toBe() checks if two values are exactly the same. For objects, it checks if they reference the same object in memory.

toEqual() compares the contents of objects, which is why we use it when testing objects with the same properties and values.

## Exercise 5: checkOutBook

### Could the random number test pass by luck, even if the code is wrong? How could we make it more reliable?

Yes, because checkOutBook uses Math.random(), the test could pass by luck even if the function sometimes returns invalid numbers.

We could mock Math.random() to test specific values instead of relying on random results.