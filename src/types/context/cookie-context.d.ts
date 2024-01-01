import { CurrentSpace } from './auth/useAuth';

interface CookieContextState {
  currentSpace?: CurrentSpace | null;
  /** pass encoded jwt then decode, then setCurrentSpace as decoded object */
  setCurrentSpace: (space: CurrentSpace | null) => void;
  // setCurrentSpace: (space: CurrentSpace | null) => void;
  currentOrganization?: string | null;
  setCurrentOrganization: (organization: string | null) => void;
  resetCurrentSpace: () => void;
  handleSetCurrentSpace: () => void;
  hasSelectChanged: boolean;
}
