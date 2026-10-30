import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize.js";

export class Loan extends Model {
  declare id: number;
  declare bookId: number;
  declare memberId: number;
  declare loanDate: Date;
  declare returnDate: Date | null;
}

Loan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Loan",
    tableName: "loans",
    timestamps: false,
  }
);