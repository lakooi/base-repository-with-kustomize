// SPDX-FileCopyrightText: 2022 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import fs from 'fs';
import path from 'path';
import { QueryInterface, Transaction } from 'sequelize';

const users: string = fs.readFileSync(
  path.resolve(__dirname, '../../../../mockData/users.sql'), 'utf8'
);

const courses: string = fs.readFileSync(
  path.resolve(__dirname, '../../../../mockData/courses.sql'), 'utf8'
);

const courseInstances: string = fs.readFileSync(
  path.resolve(__dirname, '../../../../mockData/course_instances.sql'), 'utf8'
);

const courseInstanceRoles: string = fs.readFileSync(
  path.resolve(__dirname, '../../../../mockData/course_instance_roles.sql'), 'utf8'
);

const courseTranslation: string = fs.readFileSync(
  path.resolve(__dirname, '../../../../mockData/course_translations.sql'), 'utf8'
);

const attainable: string = fs.readFileSync(
  path.resolve(__dirname, '../../../../mockData/attainable.sql'), 'utf8'
);

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction: Transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(users, { transaction });
      await queryInterface.sequelize.query(courses, { transaction });
      await queryInterface.sequelize.query(courseInstances, { transaction });
      await queryInterface.sequelize.query(courseInstanceRoles, { transaction });
      await queryInterface.sequelize.query(attainable, { transaction });
      await queryInterface.sequelize.query(courseTranslation, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction: Transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('course_translation', {}, { transaction });
      await queryInterface.bulkDelete('course_instance_role', {}, { transaction });
      await queryInterface.bulkDelete('attainable', {}, { transaction });
      await queryInterface.bulkDelete('course_instance', {}, { transaction });
      await queryInterface.bulkDelete('course', {}, { transaction });
      await queryInterface.bulkDelete('user', {}, { transaction });

      await queryInterface.sequelize.query(
        'ALTER SEQUENCE course_translation_id_seq RESTART;', { transaction }
      );

      await queryInterface.sequelize.query(
        'ALTER SEQUENCE attainable_id_seq RESTART;', { transaction }
      );

      await queryInterface.sequelize.query(
        'ALTER SEQUENCE course_instance_id_seq RESTART;', { transaction }
      );

      await queryInterface.sequelize.query(
        'ALTER SEQUENCE course_id_seq RESTART;', { transaction }
      );

      await queryInterface.sequelize.query(
        'ALTER SEQUENCE user_id_seq RESTART;', { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
};
