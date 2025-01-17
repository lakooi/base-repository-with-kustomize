// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {
  CreationOptional, DataTypes, ForeignKey, Model, InferAttributes, InferCreationAttributes
} from 'sequelize';

import { sequelize } from '..';
import Course from './course';

export default class CourseInstance extends Model<
  InferAttributes<CourseInstance>,
  InferCreationAttributes<CourseInstance>
> {
  declare id: CreationOptional<number>;
  declare courseId: ForeignKey<Course['id']>;
  declare sisuCourseInstanceId: string | null;
  declare gradingScale: string;
  declare startingPeriod: string;
  declare endingPeriod: string;
  declare type: string;
  declare minCredits: number;
  declare maxCredits: number;
  declare startDate: Date;
  declare endDate: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CourseInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id'
      }
    },
    sisuCourseInstanceId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    gradingScale: {
      type: DataTypes.ENUM('PASS_FAIL', 'NUMERICAL', 'SECOND_NATIONAL_LANGUAGE'),
      allowNull: false
    },
    startingPeriod: {
      type: DataTypes.ENUM('I', 'II', 'III', 'IV', 'V'),
      allowNull: false
    },
    endingPeriod: {
      type: DataTypes.ENUM('I', 'II', 'III', 'IV', 'V'),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    minCredits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxCredits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: new DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: new DataTypes.DATEONLY,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'course_instance'
  }
);
