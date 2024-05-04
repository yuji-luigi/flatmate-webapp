import { useEffect } from "react";
import { useCrudSliceStore } from "../redux/features/crud/crudSlice";
import { FrontendEntity } from "../types/redux/CrudSliceInterfaces";

type useGetCrudDocumentProps = {
  endpoint?: string;
  entity?: FrontendEntity | null | undefined | "";
};

export const useFetchCrudDocument: (args: useGetCrudDocumentProps) => void = ({
  entity,
  endpoint,
}: useGetCrudDocumentProps) => {
  const { fetchCrudDocument } = useCrudSliceStore();
  useEffect(() => {
    // if (entity) {
    //   fetchCrudDocument({ entity });
    // }
    if (endpoint && entity) {
      fetchCrudDocument({ owEndpoint: endpoint, entity });
    }
  }, [entity, endpoint]);
};
