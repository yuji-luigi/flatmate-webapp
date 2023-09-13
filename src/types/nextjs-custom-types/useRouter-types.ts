import { NextRouter } from 'next/router';
import { Sections } from '../general/data/sections-type';
import { ParsedUrlQuery } from 'querystring';

export interface ParsedQueryCustom extends ParsedUrlQuery {
  entity?: Sections;
  id?: string;
  linkId?: string;
  parentId?: string;
  postId?: string;
  organizationId?: string;
  slug?: string | string[];
  arrSlug?: string[];
}

export interface UseRouterWithCustomQuery extends NextRouter {
  query: ParsedQueryCustom;
}
