import mongoose from "mongoose";
import * as Types from "../../Types";

const organizationSchema = new mongoose.Schema<Types.IOrganization>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model<Types.IOrganization>(
  "Organization",
  organizationSchema
);

export default Organization;
