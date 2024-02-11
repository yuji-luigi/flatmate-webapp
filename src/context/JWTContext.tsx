import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import axiosInstance, { AxiosMeResponse } from '../utils/axios-instance';
import { _PATH_API, PATH_AUTH } from '../path/path-api';
import {
  JWTContextReducerAction,
  JWTContextState,
  JWTContextHandlers,
  Register,
  Login,
  Logout,
  AuthContextInterface,
  RegisterData,
} from '../types/context/auth/useAuth';
import { _PATH_FRONTEND } from '../path/path-frontend';
import { Role, UserModel } from '../types/models/space-model';

const initialState: JWTContextState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  loggedAs: null,
};

const handlers: JWTContextHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, loggedAs } = action.payload as JWTContextState;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      loggedAs,
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
    loggedAs: null,
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
  method: 'jwt',
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

function AuthProvider({
  children,
  initialUser,
  initialLoggedAs,
}: {
  children: ReactNode;
  initialUser?: UserModel;
  initialLoggedAs?: Role;
}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    user: initialUser,
    isAuthenticated: !!initialUser,
    isInitialized: !!initialUser,
    loggedAs: initialLoggedAs,
  });
  const { push } = useRouter();
  useEffect(() => {
    const initialize = async () => {
      try {
        if (state.isInitialized) return;

        // const accessToken =
        //   typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        // if (accessToken && isValidToken(accessToken)) {
        //   setSession(accessToken);
        const response = await axiosInstance.get<AxiosMeResponse>(PATH_AUTH.me, {
          withCredentials: true,
        });
        const { user, loggedAs } = response.data;
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user,
            loggedAs,
          },
        });
        // } else {
        //   dispatch({
        //     type: 'INITIALIZE',
        //     payload: {
        //       isAuthenticated: false,
        //       user: null,
        //     },
        //   });
        // }
      } catch (error) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login: Login = async (email, password, role) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axiosInstance.post(
        _PATH_API.auth.login(role),
        { email, password }
        // { withCredentials: true }
      );
      const { token } = response.data.data;
      // setSession(token.accessToken);

      // // call me and get the user
      const responseMe = await axiosInstance.get<AxiosMeResponse>(PATH_AUTH.me);
      const { user, loggedAs } = responseMe.data;
      // const res = await fetch('/api/mock', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // const user = await res.json();
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          loggedAs,
        },
      });
    } catch (error: any) {
      throw error;
    }
  };

  const register: Register = async (formData: RegisterData) => {
    try {
      const response = await axiosInstance.post(PATH_AUTH.register, formData);
      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      // setSession(accessToken);

      dispatch({
        type: 'REGISTER',
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
    deleteCookie('jwt');
    deleteCookie('space');
    deleteCookie('loggedAs');
    await axiosInstance.get(PATH_AUTH.logout, { withCredentials: true });
    push(_PATH_FRONTEND.auth.login);
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('spaceToken');
    // setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
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
