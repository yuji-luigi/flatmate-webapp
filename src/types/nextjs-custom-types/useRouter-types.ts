import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { Sections } from "../general/data/sections-type";
import { Role } from "../models/space-model";

export interface ParsedQueryCustom extends ParsedUrlQuery {
  entity?: Sections;
  id?: string;
  linkId?: string;
  parentId?: string;
  postId?: string;
  organizationId?: string;
  slug?: string | string[];
  arrSlug?: string[];
  loggedAs: Role;
}

export interface UseRouterWithCustomQuery extends NextRouter {
  query: ParsedQueryCustom;
}
