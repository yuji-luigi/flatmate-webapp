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
    }

    return () => {
      setCurrentEntity(null); // Reset to initial state when component unmounts
    };
  }, [entity, setCurrentEntity]);

  useEffect(() => {}, [currentEntity]);
  const _entity = { entity: entity || currentEntity || router.query.entity };
  return {
    ...router,
    query: {
      ...router.query,
      ...(_entity.entity && _entity),
    } as ParsedQueryCustom,
  };
}

export default useRouterWithCustomQuery;
