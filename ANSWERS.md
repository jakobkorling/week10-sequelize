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

## Skill 4: Relationships

Why does the loan date belong in the loans table, and not in books or members?

The loan date belongs in the loans table because it describes a specific loan, not the book or the member.

A book can be borrowed multiple times, and a member can borrow multiple books. Each loan needs its own date so we can keep track of when a book was borrowed and maintain the loan history.


## Week 11 – Catching Bugs in Production with Sentry

## Exercise 1 – Install the alarm system

Question: Why must instrument.ts be imported before everything else?

Sentry needs to start before the rest of the application so it can monitor the app and catch errors from the beginning.

Question: Why do we keep the DSN in .env instead of in the code?

We keep the DSN in .env to separate configuration from the code. It also makes it easier to change the DSN without changing the code.

## Exercise 2 – Your first error report

Question: You didn't add any extra information to this error yourself. List everything Sentry recorded anyway.

Sentry automatically recorded the error message, file name and line number (index.ts:20), stack trace, Node.js version (v26.7.0), operating system (macOS 27.2), environment (production), request URL, HTTP method (GET), and whether the error was handled or not. It also recorded a trace ID.

## Exercise 3 – Order matters

The error was still sent to Sentry even when the error handler was placed above the routes. This is because the newer version of Sentry automatically captures errors in Express 5.

Normally, an Express error handler needs to be placed after the routes because Express processes middleware in order. If the handler is placed before the routes, it cannot catch errors passed from those routes.

## Exercise 5 - Breadcrumbs & Tags

A breadcrumb shows what happened before an error occurred. For example, "Fetch books route" shows that the /books endpoint was called.

A tag is used to categorize and filter errors. For example, `feature:books` makes it easier to find errors related to books.

## Exercise 6 – One helper instead of copy-paste

Why is it better to use a helper function instead of repeating the same code in every catch block?

A helper function reduces duplicated code and makes it easier to maintain. If we need to change how errors are reported, we only need to update one function instead of every catch block.


## Week 11 - SonarQube


## Exercise 2 – Your first scan

Question: Did your project pass or fail the quality gate? How many issues did SonarQube find?

Answer: My project passed the quality gate. SonarQube found 1 issue, which was a minor code smell in src/sequelize.ts.

## Exercise 3 – Read before you fix

Issue 1

Rule: typescript – Unnecessary type assertion
File: src/sequelize.ts, line 7
What's wrong: The code uses a type assertion that TypeScript doesn't need.
Compliant code: Remove the unnecessary type assertion.

Is it a problem? Yes, but it's a minor issue. Removing it makes the code cleaner and easier to read.

## Question: Explain each of the three issue groups SonarQube uses, with an example.

Answer:

Reliability (Bugs): Problems that can cause the application to behave incorrectly, like using a variable that could be undefined.

Security (Vulnerabilities): Problems that could make the application unsafe, like allowing SQL injection.

Maintainability (Code Smells): Problems that make code harder to read or maintain, like unnecessary type assertions.

## Question: SonarQube, your tests and Sentry all help you find problems. What does each one find that the others can't?

Answer:

SonarQube analyzes the code and finds potential problems without running it.

Tests check that the code works as expected.

Sentry tracks errors that happen while the application is running.

## Exercise 4 – Keep your token out of code

What can someone do with your SonarQube token if it leaks?

Someone could use my token to access SonarQube with my permissions, view project information and potentially modify analysis results.

Why is it better to keep the project key in sonar-project.properties instead of a long command?

It makes the command shorter, keeps the configuration in one place and makes it easier to run the same analysis again.

## Exercise 5 – Scan only your own code

Question: What changed in the numbers, and why? Why is it a problem when a tool reports issues in code you didn't write?

Answer: The number of lines decreased from 962 to 605 after adding exclusions. SonarQube now scans 523 lines of code and found 0 issues.

The number of issues also decreased from 1 to 0 because I fixed the unnecessary type assertion in src/sequelize.ts.

This happened because SonarQube now focuses on my own source code and ignores unnecessary files.

It is a problem when SonarQube reports issues in code I didn't write because it makes the results harder to understand and can distract me from problems in my own code.

## Exercise 6 – Fix, test, repeat

Database connection

My database connection already uses async/await with try/catch, so I didn't need to change it.

Testing

I ran npm test and all 31 tests passed.

I ran npm run sonar and the analysis was successful.

Issues fixed

Issue 1: Unnecessary type assertion in src/sequelize.ts.

Fix: Removed the unnecessary !.

Result: The issue was resolved.

SonarQube now reports 0 open issues, so I couldn't fix three additional issues.

## Why should you run tests after fixing an issue?

To make sure the changes didn't break anything and that the code still works.

Why should you scan the code again after fixing an issue?

To check that the issue is gone and that no new problems were introduced.

## Week 12 - AI Agents

### Exercise 1 - Agent or automation?

| Scenario | Type | Explanation |
| --- | --- | --- |
| 1 | Automation | It follows the same steps every Monday. |
| 2 | Agent | It needs to understand the question and decide what information to look up. |
| 3 | Automation | It follows the same steps every night, even though it uses AI. |
| 4 | Automation | It performs a predefined action when a GitHub issue is created. |
| 5 | Agent | It uses different sources of information to make a decision based on the situation. |
| 6 | Automation | It follows the same steps every time a form is submitted. |

**Why is scenario 3 not an agent even though it uses AI?**

The AI is only used to summarise the posts. Just like the Reddit example, the workflow follows the same steps every time. The AI does not decide which steps to take or which tools to use.

**Why is an automation often a better choice than an agent?**

An automation is usually cheaper, faster and easier to test because it follows predefined steps. If the task does not require decision-making, there is no need to use an agent.

### Exercise 2 - Brain and memory

**What happened when the context window was 1, and when there was no memory? Explain what the context window length means.**

When the context window was set to 1, the agent remembered my dog's name but gave me the wrong name. Without memory, the agent could not remember my name at all and treated each message as a new conversation.

The context window length determines how many previous conversation exchanges the agent has access to.

**Why not just set the context window to 1000?**

A larger context window means that the model has to process more information with every message. This uses more tokens, can increase the cost and make the agent slower.

### Exercise 3 - Your first tool

**Which questions made the agent use the weather tool, and which didn't? Nobody told the agent when to use the tool. How did it decide?**

The agent used the weather tool when I asked if I should bring an umbrella and if I needed a jacket. It did not need the weather tool to calculate 12 times 7. The agent understood the context of each question and decided which tools were needed based on their names and descriptions.

**This is the difference between an agent and the automation from Exercise 1. Explain it using what you saw in the logs.**

The logs showed that the agent used different tools depending on the question. An automation would follow the same predefined steps every time, while an agent decides which steps to take based on the situation.

**What would change if OpenWeatherMap offered an MCP server instead? Name one advantage.**

Other AI applications that support MCP could use the same weather tools without needing a separate integration for each application. MCP provides a standard way of connecting AI agents to tools.

### Exercise 4 - Build your own tool with an HTTP request

**Explain API, HTTP request and function in your own words. Use the vending machine from the video, and one example from your own Express API.**

An API defines what information and actions are available to another application. An HTTP request is how we communicate with the API, and a function performs a specific action.

In the vending machine example, the available choices represent the API, pressing a button represents the request, and dispensing the product represents the function.

In my Express API, sending a GET request to /books retrieves a list of books from the database.

**What happened to your agent's answer when you changed the tool's description to something vague, like "tool"?**

The agent still used both the weather and air quality tools. I think this is because the name "Get air quality" was descriptive enough for the agent to understand what the tool does. However, a clear description makes it easier for the agent to understand when to use it.

### Exercise 5 - Write a real prompt

With the vague prompt "Help the user.", the agent asked several follow-up questions instead of giving recommendations. It did not know which location to use or what information was relevant.

With the structured prompt, the agent understood its role, assumed the user was in Karlskrona and provided recommendations based on weather and air quality. The answers became more relevant, consistent and useful.

The structured prompt also made the agent's behaviour more predictable because it had clear instructions about its role, task, tools, constraints and expected output.

One thing that could still be improved is the length of the answers, since the agent sometimes provided more information than necessary.

### Exercise 6 - Break it on purpose

I intentionally changed the URL in the air quality tool to an invalid endpoint. This resulted in a 404 Not Found error.

The agent handled the error by explaining that it could not retrieve the current air quality data instead of inventing measurements.

In the execution logs, I could see which tool failed and the error message. This made it easy to identify the problem.

After restoring the correct URL, I tested the same question again and the agent successfully returned the current air quality data.

Execution logs are useful for debugging because they show which nodes and tools were executed, their input and output, and any errors that occurred.