import { Author } from "./Author.js";
import { Book } from "./Book.js";
import { Loan } from "./Loan.js";
import { Member } from "./Member.js";

Author.hasMany(Book, {
  foreignKey: "authorId",
  as: "books",
});

Book.belongsTo(Author, {
  foreignKey: "authorId",
  as: "author",
});

Member.hasMany(Loan, {
  foreignKey: "memberId",
  as: "loans",
});

Loan.belongsTo(Member, {
  foreignKey: "memberId",
  as: "member",
});

Book.hasMany(Loan, {
  foreignKey: "bookId",
  as: "loans",
});

Loan.belongsTo(Book, {
  foreignKey: "bookId",
  as: "book",
});

Member.belongsToMany(Book, {
  through: Loan,
  foreignKey: "memberId",
  otherKey: "bookId",
  as: "borrowedBooks",
});

Book.belongsToMany(Member, {
  through: Loan,
  foreignKey: "bookId",
  otherKey: "memberId",
  as: "borrowers",
});