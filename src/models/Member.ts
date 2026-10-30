import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize.js";

export class Member extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Member",
    tableName: "members",
    timestamps: false,
  }
);