import { Moment } from "moment";

export type Project = {
  id: number;
  name: string;
  created_by_id: number;
  created_at: Moment;
  updated_at: Moment;
  deleted_at: Moment | null;
};

export type User = {
  id: number;
  username: string;
  email: string;
  verified: Moment | null;
  created_at: Moment;
  updated_at: Moment;
};
