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


Week 11 – Catching Bugs in Production with Sentry

Exercise 1 – Install the alarm system

Question: Why must instrument.ts be imported before everything else?

Sentry needs to start before the rest of the application so it can monitor the app and catch errors from the beginning.

Question: Why do we keep the DSN in .env instead of in the code?

We keep the DSN in .env to separate configuration from the code. It also makes it easier to change the DSN without changing the code.

Exercise 2 – Your first error report

Question: You didn't add any extra information to this error yourself. List everything Sentry recorded anyway.

Sentry automatically recorded the error message, file name and line number (index.ts:20), stack trace, Node.js version (v26.7.0), operating system (macOS 27.2), environment (production), request URL, HTTP method (GET), and whether the error was handled or not. It also recorded a trace ID.

Exercise 3 – Order matters

The error was still sent to Sentry even when the error handler was placed above the routes. This is because the newer version of Sentry automatically captures errors in Express 5.

Normally, an Express error handler needs to be placed after the routes because Express processes middleware in order. If the handler is placed before the routes, it cannot catch errors passed from those routes.

Exercise 5 - Breadcrumbs & Tags

A breadcrumb shows what happened before an error occurred. For example, "Fetch books route" shows that the /books endpoint was called.

A tag is used to categorize and filter errors. For example, `feature:books` makes it easier to find errors related to books.