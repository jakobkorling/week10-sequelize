import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize.js";

export class Book extends Model {
  declare id: number;
  declare title: string;
  declare authorId: number;
  declare publishedYear: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
    },
    authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "authors",
        key: "id",
    },
    },
    publishedYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        min: 1,
    },
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: false,
  }
);