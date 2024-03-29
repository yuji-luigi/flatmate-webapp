import { createContext, ReactNode, useEffect, useReducer } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import axiosInstance, { AxiosMeResponse } from "../utils/axios-instance";
import { _PATH_API, PATH_AUTH } from "../path/path-api";
import {
  JWTContextReducerAction,
  JWTContextState,
  JWTContextHandlers,
  Register,
  Login,
  Logout,
  AuthContextInterface,
  RegisterData,
} from "../types/context/auth/useAuth";
import { _PATH_FRONTEND } from "../path/path-frontend";
import { MeUser, Role, UserModel } from "../types/models/space-model";
import { NOTIFICATIONS } from "../data/showNofification/notificationObjects";

const initialState: JWTContextState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: JWTContextHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      isSuperAdmin: user?.isSuperAdmin,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated: true,
      user,
      isSuperAdmin: user?.isSuperAdmin,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    isSuperAdmin: false,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated: true,
      user,
      isSuperAdmin: user?.isSuperAdmin,
    };
  },
};

const reducer = (state: JWTContextState, action: JWTContextReducerAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextInterface>({
  ...initialState,
  method: "jwt",
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser?: MeUser }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    user: initialUser,
    isAuthenticated: !!initialUser,
    isInitialized: !!initialUser,
  });
  const router = useRouter();
  const { push } = router;
  useEffect(() => {
    const initialize = async () => {
      try {
        if (state.isInitialized) return;
        const response = await axiosInstance.get<AxiosMeResponse>(PATH_AUTH.me, {
          withCredentials: true,
        });
        const { user } = response.data;
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } catch (error) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, [router]);

  const login: Login = async (email, password, role) => {
    try {
      await axiosInstance.post(_PATH_API.auth.login(role), { email, password });
      const rawMe = await axiosInstance.get<AxiosMeResponse>(PATH_AUTH.me);
      const { user } = rawMe.data;

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });

      if (role === "inhabitant") {
        push(_PATH_FRONTEND.pathAfterLoginInhabitant);
        return;
      }
      push(_PATH_FRONTEND.pathAfterLogin);
    } catch (error: any) {
      showNotification(NOTIFICATIONS.ERROR.general({ data: error.message || error }));
    }
  };

  const register: Register = async (formData: RegisterData) => {
    try {
      const response = await axiosInstance.post(PATH_AUTH.register, formData);
      const { accessToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      // setSession(accessToken);

      dispatch({
        type: "REGISTER",
        payload: {
          user,
        },
      });
    } catch (error: any) {
      console.error(error.message || error);
      throw error;
    }
  };

  const logout: Logout = async () => {
    deleteCookie("jwt");
    deleteCookie("space");
    await axiosInstance.get(PATH_AUTH.logout, { withCredentials: true });
    push(_PATH_FRONTEND.auth.login);
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('spaceToken');
    // setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
