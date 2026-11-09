Skill 5: checkOutBook

Question: Why could the random number test pass by luck, even if the code is wrong? How could we make it more reliable?

Answer: Since checkOutBook uses Math.random(), the test could pass by luck even if the function sometimes returns numbers outside the valid range.

We could mock Math.random() to test specific values instead of relying on random results.