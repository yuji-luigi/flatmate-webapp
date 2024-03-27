import { CookieValueTypes } from "cookies-next";
import { MeUser } from "../../models/space-model";

interface CurrentSpace {
  _id: string;
  name: string;
  address?: CookieValueTypes;
  // organization: ObjectId;
  slug: string;
  image: CookieValueTypes;
}

export type JwtReturnType = {
  email: string;
} & {
  spaceId?: string;
  spaceName: string;
  spaceSlug: string;
  spaceAddress: string;
  organizationId?: string;
};

type ActionEnum = "LOGIN" | "REGISTER" | "LOGOUT" | "INITIALIZE";

export interface JWTContextState {
  isAuthenticated?: boolean | null;
  isInitialized?: boolean | null;
  user?: MeUser | null;
  isSuperAdmin?: boolean;
}
export interface ReducerStateAction {
  payload?: JWTContextState;
}

export interface JWTContextReducerAction {
  payload?: JWTContextState;
  type: ActionEnum;
}

export interface JWTContextReducerLogoutAction {
  type: "LOGOUT";
}

export type JWTContextReducer = (
  state: JWTContextState,
  action: ReducerStateAction
) => JWTContextState;

export interface JWTContextHandlers {
  [key: ActionEnum]: JWTContextReducer;
  INITIALIZE: JWTContextReducer;
  LOGIN: JWTContextReducer;
  LOGOUT: JWTContextReducer;
  REGISTER: JWTContextReducer;
}

export type Logout = () => Promise<void>;

export interface RegisterData {
  email: string | null;
  password: string | null;
  password2: string | null;
  name: string;
  surname: string | null;
  // role: string | null;
}
export type Register = (data: RegisterData) => Promise<void>;
export type Login = (email?: string, password?: string, role: Role) => Promise<void>;

export interface AuthContextInterface extends JWTContextState {
  method: string;
  login: Login;
  reInitialize: () => Promise<void>;
  logout: () => void;
  register: Register;
}
