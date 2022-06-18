import {
  GET_DATA_USER,
  LOGOUT_USER,
  EDIT_DATA_USER,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_UNSUCCESS,
} from "../actions/profile";

const profileInitialState = {
  name: "",
  email: "",
  password: "",
  isAuth: false,
  wasOnPageForgotPassword: false,
};

export const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case GET_DATA_USER: {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
        password: "1234567",
        isAuth: true,
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
      };
    }

    case AUTHORIZATION_FAILED: {
      return {
        ...state,
        isAuth: true,
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

    default: {
      return state;
    }
  }
};
