import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType, CompanyType } from "./types.js";
import { Company, User } from "../database/models.js";

export const mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    //Create USer
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = new User(args);
        return await user.save();
      },
    },

    //Update USer
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await User.findByIdAndUpdate(args.id, args, { new: true });
      },
    },

    //Delete User
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return await User.findByIdAndDelete(args.id);
      },
    },

    //Create Company
    createCompany: {
      type: CompanyType,
      args: {
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const company = new Company(args);
        return await company.save();
      },
    },

    //update Comapny
    updateCompany: {
      type: CompanyType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        slogan: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await Company.findByIdAndUpdate(args.id, args, { new: true });
      },
    },

    //Delete Company
    deleteCompany: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Company.findByIdAndDelete(args.id);
      },
    },
  },
});
