import {
  GraphQLError,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import { CompanyType, UserType } from "./types.js";
import { Company, User } from "../database/models.js";
import { mutations } from "./Mutations.js";

const Query = new GraphQLObjectType({
  name: "QueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        const user = await User.findById(args.id);
        if (!user) {
          throw new GraphQLError(`User with id ${args.id} not found`);
        }
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        const company = await Company.findById(args.id);
        if (!company) {
          throw new GraphQLError(`Company with id ${args.id} not found`);
        }
        return company;
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      async resolve() {
        return await Company.find();
      },
    },
  },
});

export default new GraphQLSchema({ query: Query, mutation: mutations });
