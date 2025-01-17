// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {
  CreationOptional, DataTypes, Model, InferAttributes, InferCreationAttributes
} from 'sequelize';

import { sequelize } from '..';

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare studentId: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    studentId: {
      type: new DataTypes.STRING,
      unique: true,
      allowNull: true,
      defaultValue: null
    },
    name: {
      type: new DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: new DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'user'
  }
);
