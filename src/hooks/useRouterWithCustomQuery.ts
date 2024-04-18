// useRouterWithCustomQuery.ts
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  ParsedQueryCustom,
  UseRouterWithCustomQuery,
} from "../types/nextjs-custom-types/customQuery";
import { useCurrentEntityContext } from "../context/CurrentEntityContext";
import { FrontendEntity } from "../types/redux/CrudSliceInterfaces";

function useRouterWithCustomQuery({
  entity,
}: {
  entity?: FrontendEntity;
} = {}): UseRouterWithCustomQuery {
  console.log("useRouterWithCustomQuery called", entity);
  const router = useRouter();
  const { currentEntity, setCurrentEntity } = useCurrentEntityContext();
  useEffect(() => {
    console.log("Entity on mount:", entity);
    if (entity) {
      setCurrentEntity(entity);
    }

    return () => {
      console.log("Cleaning up entity:", entity);
      setCurrentEntity(null); // Reset to initial state when component unmounts
    };
  }, [entity, setCurrentEntity]);

  useEffect(() => {
    console.log("Current Entity in Context:", currentEntity);
  }, [currentEntity]);

  return {
    ...router,
    query: {
      ...router.query,
      entity: entity || currentEntity || router.query.entity,
    } as ParsedQueryCustom,
  };
}

export default useRouterWithCustomQuery;
