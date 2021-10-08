import { v4 as uuidv4 } from "uuid"
import { Knex } from "knex"

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("families").del()

  // Inserts seed entries
  await knex("families").insert([
    {
      family_id: uuidv4(),
      family_name: "Bove",
      family_details: "test",
      family_description: "test",
      family_date_from: "1992-10-31",
      family_date_to: "2021-10-31",
    },
    {
      family_id: uuidv4(),
      family_name: "Atta",
      family_details: "test",
      family_description: "test",
      family_date_from: "1992-10-31",
      family_date_to: "2021-10-31",
    },
    {
      family_id: uuidv4(),
      family_name: "Timbtrack",
      family_details: "test",
      family_description: "test",
      family_date_from: "1992-10-31",
      family_date_to: "2021-10-31",
    },
  ])
}
