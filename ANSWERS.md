Week 10 – Sequelize

Skill 1: Understand the ORM

1. The video calls Sequelize a "translator". What does it translate, and from what into what?

Sequelize translates JavaScript code into SQL queries. This allows us to interact with the database using JavaScript methods instead of writing SQL manually.

2. What does ORM stand for? What is the "object" and what is the "relational" part?

ORM stands for Object-Relational Mapping. The object part refers to JavaScript objects and models, while the relational part refers to the tables and relationships in a relational database like PostgreSQL. ORM connects these two.

3. Write the SQL that Book.findAll() runs. Then write the SQL for Book.findByPk(3).

Book.findAll():

SELECT * FROM books;

Book.findByPk(3):

SELECT * FROM books WHERE id = 3;

4. In new Sequelize(...), what does each of these do: host, port, dialect, logging?

host: The address of the database server, for example localhost.

port: The port used to connect to the database.

dialect: Specifies which type of database we are using, for example PostgreSQL.

logging: Controls whether Sequelize prints the generated SQL queries in the terminal.

5. What does sequelize.sync() do? What would sequelize.sync({ force: true }) do, and why should you never use it on a database with real data?

sequelize.sync() creates tables based on our models if they don't already exist.

sequelize.sync({ force: true }) drops the existing tables and recreates them. This deletes the data stored in those tables, which is why we should never use it on a database containing real data.

6. Name one situation where writing plain SQL is better than using an ORM.

Writing plain SQL can be better when we need to perform complex queries with multiple joins or aggregations. It gives us more control over the query and can sometimes be easier to optimize.

Skill 4: Relationships

Why does the loan date belong in the loans table, and not in books or members?

The loan date belongs in the loans table because it describes a specific loan, not the book or the member.

A book can be borrowed multiple times, and a member can borrow multiple books. Each loan needs its own date so we can keep track of when a book was borrowed and maintain the loan history.



## Week 12 - Continuous Integration with GitHub Actions

### Exercise 1 - Your first workflow

`on` defines which events trigger the workflow, such as a push or pull request.

`runs-on` specifies which operating system the job runs on. In this case, Ubuntu.

`strategy.matrix` allows the same job to run with different configurations, such as multiple Node.js versions.

`steps` defines the actions and commands that run in the job, such as checking out the code, installing dependencies and running tests.

Nothing happened when I pushed the branch because the workflow was configured to run on `master`. After changing the branch to `week12/ci`, GitHub Actions started automatically when I pushed.

### Exercise 2 - Read the report

There was one job called `test` because the workflow only defined one job and did not use a matrix.

All 31 tests passed across four test files:
- Pizza Shop unit tests: 11 tests
- Pizza Shop integration tests: 1 test
- Library tests: 13 tests
- Schema tests: 6 tests

The Pizza Shop tests were found in `pizzashop.test.ts` and `pizzashop.integration.test.ts`. The Library tests were found in `library.test.ts`.

A test can pass locally but fail in CI because the environments can be different. For example, different Node.js versions, operating systems, missing environment variables or dependencies can cause failures.

### Exercise 3 - Red on purpose

A red cross on a pull request is better than one after merging because it warns us that something is broken before the code reaches the main branch.

It allows developers to find and fix failing tests before merging, which helps keep the main branch stable.

## Exercise 4 – Check types in CI

I added a Typecheck step to the CI workflow that runs
`npm run typecheck` before running the tests.

I intentionally added a type error by assigning a string
to a variable of type number. TypeScript detected the error.

I also created a separate `tsconfig.ci.json` to include
both source code and test files without changing the
original build structure.

After fixing the errors, both the typecheck and all 31
tests passed locally. The GitHub Actions workflow also
completed successfully.

## Exercise 5 – Pick your Node versions

I updated the CI workflow to use a matrix with Node.js
22, 24 and 26, which are the currently supported LTS
versions.

I also added an engines field to package.json with
Node.js 22 as the minimum version.

All three CI jobs passed successfully.

### Question: What's the difference between npm ci and
npm install, and why does CI use npm ci?

npm install installs dependencies and can update
package-lock.json.

npm ci installs the exact dependency versions from
package-lock.json and removes any existing node_modules
folder before installation.

CI uses npm ci because it provides clean, consistent
and reproducible installations without changing the
lock file.

## Exercise 6 – Protect week12/ci

I added a branch protection rule that requires pull
requests and passing CI checks before merging into
week12/ci.

I created a pull request with an intentionally failing
test and verified that GitHub blocked the merge.

I also added a CI status badge to README.md.

### Question: What does branch protection do that CI alone can't?

CI runs automated checks but does not prevent failing
code from being merged on its own.

Branch protection prevents merging until all required
checks have passed.