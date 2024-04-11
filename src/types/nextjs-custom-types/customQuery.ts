import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { Entity, FrontendEntity } from "../redux/CrudSliceInterfaces";

export interface ParsedQueryCustom extends ParsedUrlQuery {
  entity?: FrontendEntity;
  id?: string;
  linkId?: string;
  parentId?: string;
  postId?: string;
  organizationId?: string;
  slug?: string | string[];
  arrSlug?: string[];
}

export interface UseRouterWithCustomQuery extends Omit<NextRouter, "query"> {
  query: ParsedQueryCustom;
}
