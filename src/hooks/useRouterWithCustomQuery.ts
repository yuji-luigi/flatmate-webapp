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
  const router = useRouter();
  const { currentEntity, setCurrentEntity } = useCurrentEntityContext();
  useEffect(() => {
    if (entity) {
      setCurrentEntity(entity);

      console.log("set entity", entity, currentEntity);
    } else {
      console.log("no entity", entity, currentEntity);
    }

    return () => {
      console.log("cleanup", entity, currentEntity);
      setCurrentEntity(null); // or reset to some other default or initial state
    };
  }, [entity, setCurrentEntity]);
  return {
    ...router,
    query: {
      ...router.query,
      entity: entity || currentEntity || router.query.entity,
    } as ParsedQueryCustom,
  };
}

export default useRouterWithCustomQuery;
