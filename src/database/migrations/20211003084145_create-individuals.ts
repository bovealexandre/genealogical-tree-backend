import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("individuals", (table: Knex.TableBuilder) => {
    table.uuid("individual_id").primary().notNullable().unique()
    table.string("individual_first_name").nullable()
    table.string("individual_last_name").nullable()
    table.string("individual_place_of_birth").nullable()
    table.date("individual_date_of_birth").nullable()
    table.string("individual_details").nullable()
    table.string("individual_gender").nullable()
    table.string("individual_couple_id").nullable()
    table.string("individual_parent_id").nullable()
    table.string("individual_family_id").nullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {}
