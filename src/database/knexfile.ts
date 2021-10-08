import { Knex } from "knex"

interface IKnexConfig {
  [key: string]: Knex.Config
}

const config: IKnexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "E://Test/timbtrack-test/src/database/dev.sqlite3",
    },
    debug: true,
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
}

export default config
