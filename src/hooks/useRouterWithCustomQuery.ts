// useRouterWithCustomQuery.ts
import { useRouter } from "next/router";
import {
  ParsedQueryCustom,
  UseRouterWithCustomQuery,
} from "../types/nextjs-custom-types/customQuery";

function useRouterWithCustomQuery(): UseRouterWithCustomQuery {
  const router = useRouter();
  return { ...router, query: router.query as ParsedQueryCustom };
}

export default useRouterWithCustomQuery;
