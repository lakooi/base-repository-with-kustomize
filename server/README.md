<!--
SPDX-FileCopyrightText: 2022 The Aalto Grades Developers

SPDX-License-Identifier: MIT
-->

# Aalto Grades backend

## Table of Contents

- [Installing Node.js](#installing-nodejs)
- [Running the program](#running-the-program)
  - [Sisu API](#sisu-api)
- [Migrations](#migrations)
- [Seeds](#seeds)

## Installing Node.js

For Windows and macOS users, Node.js can be installed from:
https://nodejs.org/en/download/

For GNU/Linux users, your distribution likely contains packages for Node.js and
npm. For example:

Arch: `# pacman -S nodejs npm`  
Debian: `# apt install nodejs npm`

## Running the program

Install the necessary Node.js modules:
```
$ npm ci
```
Compile and start the program:
```
$ npm run build
$ npm run start
```
After running the last command, visit `http://localhost:3000/world` on a web
browser. You should see the output "Hello /world".

### Sisu API

To use the routes that communicate with Sisu, the environment variables `SISU_API_KEY` 
and `SISU_API_URL` must be provided. These are optional when not in production environment.

For an example:
```
$ export SISU_API_KEY="your-api-key"
$ export SISU_API_URL=www.api.com/api/sisu/v1
```

## Migrations

Migrations to keep track of changes to the database. With migrations
you can transfer existing database into another state and vice versa.
Those state transitions are saved in migration files, which describe
how to get to the new state and how to revert the changes in order
to get back to the old state.

Migration files are placed in `/src/database/migrations`.
Migration files are named with ascending numbering and name describing
the actions migration does to the database state. For an example:
```
001-initial-migration.ts
002-add-indexes.ts
```

Migrations utilize the Sequelize [Command Line Interface](https://github.com/sequelize/cli).
The database which CLI will connect is defined in `/src/configs/database.ts`,
more information on options [here](https://github.com/sequelize/cli/blob/main/docs/README.md).
Detailed information about migrations in the Sequelize
[documentation](https://sequelize.org/docs/v6/other-topics/migrations/).

Migration, seeder, config and model paths are defined in `.sequelizerc`.

Run database migrations all the way to latest one:
```
$ npm run migration:up
```

Run one migration down:
```
$ npm run migration:down
```


## Seeds

To manage data migrations to the database, you can use seeders.
Seed files include the data you want populate the database with (sample or test data).

Seeder files are placed in `/src/database/seeders`.
Seeder files are named with ascending numbering and name describing
the actions seeder does to the database state. For an example:
```
001-load-test-data.ts
002-add-more-data-points.ts
```

Run seeder files all the way to latest one:
```
$ npm run seed:up
```

Run one seeder file down (delete the populated data from database for that seeder):
```
$ npm run seed:down
```

## Unit tests

[Jest](https://jestjs.io/docs/getting-started) is used as the unit test
framework. Additionally, [supertest](https://www.npmjs.com/package/supertest)
is used for testing API functionality.

The easiest way to run unit tests is with the Docker Compose located at this
directory. In order to run it, define a PostgreSQL password in the environment
variable `POSTGRES_PASSWORD`, for example:
```
$ export POSTGRES_PASSWORD="your-wanted-password"
```
Execute Docker Compose:
```
$ docker-compose up --abort-on-container-exit --exit-code-from backend
```
This Docker Compose creates an environment where backend tests can be executed
against a PostgreSQL instance running in a container.

## API Documentation

API documentation written with the OpenAPI spec and displayed by Swagger can
be found from the path
```
<backend-url>/api-docs/
```

For more information about the OpenAPI spec:

https://swagger.io/docs/specification/about/
