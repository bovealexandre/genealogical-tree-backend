import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("families", (table: Knex.TableBuilder) => {
    table.uuid("family_id").primary().notNullable().unique()
    table.string("family_name").nullable()
    table.string("family_details").nullable()
    table.string("family_description").nullable()
    table.date("family_date_from").nullable()
    table.date("family_date_to").nullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {}
