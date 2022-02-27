import { Moment } from "moment";

export type Project = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  verified: Moment | null;
  created_at: Moment;
  updated_at: Moment;
};
