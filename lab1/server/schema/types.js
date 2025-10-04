import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Company, User } from "../database/models.js";
import { fieldsList } from "graphql-fields-list";

export const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slogan: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parent, args, context) {
        return context.userByCompanyLoader.load(parent.id);
      },
    },
  }),
});

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parent, args, context, info) {
        const selectionField = fieldsList(info).join(" ");
        return context.companyLoader.load({
          id: parent.companyId,
          selectionField,
        });
      },
    },
  }),
});
