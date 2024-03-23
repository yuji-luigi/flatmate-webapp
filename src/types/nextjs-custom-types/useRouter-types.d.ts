interface ParsedUrlQuery {
  // entity?: Sections;
  id?: string;
  linkId?: string;
  parentId?: string;
  postId?: string;
  organizationId?: string;
  slug?: string | string[];
  arrSlug?: string[];
  loggedAs: "jj" | "admin" | "user" | "organization";
}
