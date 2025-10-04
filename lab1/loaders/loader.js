import DataLoader from "dataloader";
import mongoose from "mongoose";
import { Company, User } from "../database/models.js";

export const companyLoader = new DataLoader(async (keys) => {
  const companyIds = keys.map((key) => key.id);
  const validIds = companyIds.filter((id) =>
    mongoose.Types.ObjectId.isValid(id)
  );

  const companies = await Company.find({ _id: { $in: validIds } }).select(
    keys[0].selectionField
  );
  return companyIds.map(
    (id) =>
      companies.find((company) => company._id.toString() === id?.toString()) ||
      null
  );
});

export const userByCompanyLoader = new DataLoader(async (companyIds) => {
  const users = await User.find({ companyId: { $in: companyIds } });

  return companyIds.map((id) =>
    users.filter((user) => user.companyId.toString() === id.toString())
  );
});
