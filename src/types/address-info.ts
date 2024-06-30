import { AuthTokenModel } from "./models/auth-token-model";

export interface AddressInfo {
  name: string;
  address: string;
  state: string;
  postalCode: string;
  cityCode?: string;
  stateCode?: string;
  authToken?: AuthTokenModel;
  qrcodeUrl?: string;
}
