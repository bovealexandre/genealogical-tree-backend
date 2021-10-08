import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql"
import { GraphQLDate, GraphQLDateTime } from "graphql-iso-date"
import { v4 as uuidv4 } from "uuid"

import db from "../db"

let familyType = new GraphQLObjectType({
  name: "Family",
  fields: () => ({
    family_id: {
      type: GraphQLString,
    },
    family_name: {
      type: GraphQLString,
    },
    family_details: {
      type: GraphQLString,
    },
    family_description: {
      type: GraphQLString,
    },
    family_date_to: {
      type: GraphQLDate,
    },
    family_date_from: {
      type: GraphQLDate,
    },
    created_at: {
      type: GraphQLDateTime,
    },
    updated_at: {
      type: GraphQLDateTime,
    },
  }),
})

let individualType: GraphQLObjectType = new GraphQLObjectType({
  name: "Individuals",
  fields: () => ({
    individual_id: {
      type: GraphQLString,
    },
    individual_first_name: {
      type: GraphQLString,
    },
    individual_last_name: {
      type: GraphQLString,
    },
    individual_place_of_birth: {
      type: GraphQLString,
    },
    individual_date_of_birth: {
      type: GraphQLDate,
    },
    individual_details: {
      type: GraphQLString,
    },
    individual_gender: {
      type: GraphQLString,
    },
    individual_family_id: {
      type: GraphQLString,
    },
    secondPerson: {
      type: individualType,
      resolve(parent, args) {
        return db()
          .select("*")
          .from("individuals")
          .where("id", parent.individual_couple_id)
          .first()
      },
    },
    children: {
      type: new GraphQLList(individualType),
      resolve(parent, args) {
        return db()
          .select("*")
          .from("individuals")
          .where("id", parent.individual_parent_id)
      },
    },
    created_at: {
      type: GraphQLDateTime,
    },
    updated_at: {
      type: GraphQLDateTime,
    },
  }),
})

let query = new GraphQLObjectType({
  name: "Query",
  fields: {
    families: {
      type: new GraphQLList(familyType),
      resolve() {
        return db().select().from("families")
      },
    },
    family: {
      type: familyType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, { id }) {
        return db()
          .select()
          .from("families")
          .where("individual_family_id", id)
          .first()
      },
    },
    //Individuals Query
    getFamily: {
      type: individualType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, { id }) {
        return db()
          .select()
          .from("individuals")
          .where("individual_family_id", id)
          .orderBy("individual_date_of_birth", "desc")
          .first()
      },
    },
  },
})

// eslint-disable-next-line no-unused-vars
let mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addFamily: {
        type: familyType,
        args: {
          family_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          family_details: {
            type: GraphQLString,
          },
          family_description: {
            type: GraphQLString,
          },
          family_date_to: {
            type: GraphQLString,
          },
          family_date_from: {
            type: GraphQLString,
          },
        },
        async resolve(
          parent,
          {
            family_name,
            family_details,
            family_description,
            family_date_to,
            family_date_from,
          }
        ) {
          const id = uuidv4()
          const timestamp = Date.now()
          await db("families").insert({
            family_id: id,
            family_name: family_name,
            family_details: family_details,
            family_description: family_description,
            family_date_to: family_date_to,
            family_date_from: family_date_from,
            created_at: timestamp,
            updated_at: timestamp,
          })
        },
      },
      updateFamily: {
        type: familyType,
        args: {
          family_id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          family_name: {
            type: GraphQLString,
          },
          family_details: {
            type: GraphQLString,
          },
          family_description: {
            type: GraphQLString,
          },
          family_date_to: {
            type: GraphQLString,
          },
          family_date_from: {
            type: GraphQLString,
          },
        },
        resolve(root, params) {
          db()
            .select()
            .from("families")
            .where("id", params.family_id)
            .first()
            .then(function (family) {
              db("books")
                .where("family_id", params.family_id)
                .update({
                  family_name: params.family_name || family.family_name,
                  family_details:
                    params.family_details || family.family_details,
                  family_description:
                    params.family_description || family.family_description,
                  family_date_to:
                    params.family_date_to || family.family_date_to,
                  family_date_from:
                    params.family_date_from || family.family_date_from,
                })
            })
        },
      },
      removeFamily: {
        type: familyType,
        args: {
          family_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          return db()
            .select()
            .from("families")
            .where("id", params.family_id)
            .first()
            .del()
        },
      },
      // Individuals Mutation
      addIndividual: {
        type: individualType,
        args: {
          individual_first_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          individual_last_name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          individual_place_of_birth: {
            type: GraphQLString,
          },
          individual_date_of_birth: {
            type: GraphQLString,
          },
          individual_details: {
            type: GraphQLString,
          },
          individual_gender: {
            type: new GraphQLNonNull(GraphQLString),
          },
          individual_couple_id: {
            type: GraphQLString,
          },
          individual_parent_id: {
            type: GraphQLString,
          },
          individual_family_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        async resolve(
          parent,
          {
            individual_first_name,
            individual_last_name,
            individual_place_of_birth,
            individual_date_of_birth,
            individual_details,
            individual_gender,
            individual_couple_id,
            individual_parent_id,
            individual_family_id,
          }
        ) {
          const id = uuidv4()
          const timestamp = Date.now()
          await db("individuals").insert({
            individual_id: id,
            individual_first_name: individual_first_name,
            individual_last_name: individual_last_name,
            individual_place_of_birth: individual_place_of_birth,
            individual_date_of_birth: individual_date_of_birth,
            individual_details: individual_details,
            individual_gender: individual_gender,
            individual_couple_id: individual_couple_id,
            individual_parent_id: individual_parent_id,
            individual_family_id: individual_family_id,
            created_at: timestamp,
            updated_at: timestamp,
          })
        },
      },
      updateIndividual: {
        type: individualType,
        args: {
          individual_id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString),
          },
          individual_first_name: {
            type: GraphQLString,
          },
          individual_last_name: {
            type: GraphQLString,
          },
          individual_place_of_birth: {
            type: GraphQLString,
          },
          individual_date_of_birth: {
            type: GraphQLString,
          },
          individual_details: {
            type: GraphQLString,
          },
          individual_gender: {
            type: GraphQLString,
          },
          individual_couple_id: {
            type: GraphQLString,
          },
          individual_parent_id: {
            type: GraphQLString,
          },
          individual_family_id: {
            type: GraphQLString,
          },
        },
        resolve(root, params) {
          db()
            .select()
            .from("individuals")
            .where("id", params.individual_id)
            .first()
            .then(function (individual) {
              db("books")
                .where("individual_id", params.individual_id)
                .update({
                  individual_first_name:
                    params.individual_first_name ||
                    individual.individual_first_name,
                  individual_last_name:
                    params.individual_last_name ||
                    individual.individual_last_name,
                  individual_place_of_birth:
                    params.individual_place_of_birth ||
                    individual.individual_place_of_birth,
                  individual_date_of_birth:
                    params.individual_date_of_birth ||
                    individual.individual_date_of_birth,
                  individual_details:
                    params.individual_details || individual.individual_details,
                  individual_gender:
                    params.individual_gender || individual.individual_gender,
                  individual_couple_id:
                    params.individual_couple_id ||
                    individual.individual_couple_id,
                  individual_parent_id:
                    params.individual_parent_id ||
                    individual.individual_parent_id,
                  individual_family_id:
                    params.individual_family_id ||
                    individual.individual_family_id,
                })
            })
        },
      },
      removeIndividual: {
        type: individualType,
        args: {
          individual_id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          return db()
            .select()
            .from("individuals")
            .where("individual_id", params.individual_id)
            .first()
            .del()
        },
      },
    }
  },
})

export default new GraphQLSchema({
  query: query,
  mutation: mutation,
})
