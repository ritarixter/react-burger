import {
  GET_DATA_USER,
  LOGOUT_USER,
  EDIT_DATA_USER,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_UNSUCCESS,
  AUTH_CHECKED,
  TProfileActions,
} from "../actions/profile";

type TProfileInitialState = {
  name: string;
  email: string;
  password: string;
  isAuth: boolean;
  wasOnPageForgotPassword: boolean;
  isAuthChecked: boolean;
  isAuthFailed: boolean;
};

const profileInitialState: TProfileInitialState = {
  name: "",
  email: "",
  password: "",
  isAuth: false,
  wasOnPageForgotPassword: false,
  isAuthChecked: false,
  isAuthFailed: false,
};

export const profileReducer = (
  state = profileInitialState,
  action: TProfileActions
): TProfileInitialState => {
  switch (action.type) {
    case GET_DATA_USER: {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
        password: "1234567",
        isAuth: true,
        isAuthFailed: false,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        name: "",
        email: "",
        password: "",
        isAuth: false,
      };
    }

    case EDIT_DATA_USER: {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
      };
    }

    case AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        isAuthFailed: false,
      };
    }

    case AUTHORIZATION_FAILED: {
      return {
        ...state,
        isAuth: false,
        isAuthFailed: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        wasOnPageForgotPassword: true,
      };
    }

    case FORGOT_PASSWORD_UNSUCCESS: {
      return {
        ...state,
        wasOnPageForgotPassword: false,
      };
    }

    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    default: {
      return state;
    }
  }
};
