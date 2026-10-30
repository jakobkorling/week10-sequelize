import express from "express";
import { sequelize } from "./sequelize.js";
import { Book } from "./models/Book.js";
import { ValidationError, Op } from "sequelize";
import "./models/associations.js";
import { Author } from "./models/Author.js";
import { Member } from "./models/Member.js";
import { Loan } from "./models/Loan.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Week 10 Sequelize API is running!" });
});

app.get("/books", async (req, res) => {
  try {
      const books = await Book.findAll({
        include: [
          {
            model: Author,
            as: "author",
            attributes: ["id", "name"],
          },
        ],
      });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const { title, authorId, publishedYear } = req.body;

    const author = await Author.findByPk(authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    book.set({
      title,
      authorId,
      publishedYear,
    });

    await book.validate();
    await book.save();

    res.json(book);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => err.message),
      });
    }

    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await book.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, authorId, publishedYear } = req.body;

    const author = await Author.findByPk(authorId);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const book = await Book.create({
      title,
      authorId,
      publishedYear,
    });

    res.status(201).json(book);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => err.message),
      });
    }

    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    console.log("Book model:", Book.name);
    console.log("Registered models:", Object.keys(sequelize.models));

    await sequelize.sync();
    console.log("Database models synchronized!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

app.post("/authors", async (req, res) => {
  try {
    const { name } = req.body;

    const author = await Author.create({ name });

    res.status(201).json(author);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => err.message),
      });
    }

    console.error("Error creating author:", error);
    res.status(500).json({ error: "Failed to create author" });
  }
});

app.get("/authors/:id/books", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: [
        {
          model: Book,
          as: "books",
        },
      ],
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    console.error("Error fetching author books:", error);
    res.status(500).json({ error: "Failed to fetch author books" });
  }
});

app.post("/loans", async (req, res) => {
  try {
    const { bookId, memberId } = req.body;

    const book = await Book.findByPk(bookId);
    const member = await Member.findByPk(memberId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const activeLoan = await Loan.findOne({
      where: {
        bookId,
        returnDate: {
          [Op.is]: null,
        },
      },
    });

    if (activeLoan) {
      return res.status(409).json({
        error: "Book is already on loan",
      });
    }

    const loan = await Loan.create({
      bookId,
      memberId,
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ error: "Failed to create loan" });
  }
});

app.get("/loans", async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        {
          model: Book,
          as: "book",
        },
        {
          model: Member,
          as: "member",
        },
      ],
    });

    res.json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Failed to fetch loans" });
  }
});

app.post("/members", async (req, res) => {
  try {
    const { name, email } = req.body;

    const member = await Member.create({ name, email });

    res.status(201).json(member);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((err) => err.message),
      });
    }

    console.error("Error creating member:", error);
    res.status(500).json({ error: "Failed to create member" });
  }
});

app.put("/loans/:id/return", async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    if (loan.returnDate !== null) {
      return res.status(400).json({
        error: "Book has already been returned",
      });
    }

    loan.returnDate = new Date();
    await loan.save();

    res.json(loan);
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ error: "Failed to return book" });
  }
});

app.get("/members/:id/loans", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, {
      include: [
        {
          model: Loan,
          as: "loans",
          include: [
            {
              model: Book,
              as: "book",
            },
          ],
        },
      ],
    });

    if (!member) {
      return res.status(404).json({
        error: "Member not found",
      });
    }

    res.json(member);
  } catch (error) {
    console.error("Error fetching member loans:", error);
    res.status(500).json({
      error: "Failed to fetch member loans",
    });
  }
});

startServer();