import { createContext, ReactNode, useState } from "react";
import { Entity } from "../types/redux/CrudSliceInterfaces";

export const EntityContext = createContext<IEntityContext>({
  overrideEntity: "",
  setOverrideEntity(entity: Entity) {},
});

const useStore = () => {
  const [overrideEntity, setOverrideEntity] = useState<Entity | "">("");
  return {
    overrideEntity,
    setOverrideEntity,
  };
};

export const EntityContextProvider = ({ children }: { children: ReactNode }) => (
  <EntityContext.Provider value={useStore()}>{children}</EntityContext.Provider>
);
