// useRouterWithCustomQuery.ts
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  ParsedQueryCustom,
  UseRouterWithCustomQuery,
} from "../types/nextjs-custom-types/customQuery";
import { useCurrentEntityContext } from "../context/CurrentEntityContext";
import { FrontendEntity, isFrontendEntity } from "../types/redux/CrudSliceInterfaces";

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
  let _entity = entity || currentEntity || router.query.entity;
  _entity = isFrontendEntity(_entity) ? _entity : "placeholder";
  return {
    ...router,
    query: {
      ...router.query,
      entity: _entity,
    } as ParsedQueryCustom,
  };
}

export default useRouterWithCustomQuery;
