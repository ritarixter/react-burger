import { GET_DATA_USER, LOGOUT_USER,EDIT_DATA_USER } from "../actions/profile";

const profileInitialState = {
  name: "",
  email: "",
  password: "123456",
};

export const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case GET_DATA_USER: {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        name: '',
        email: '',
        password:''
      };
    }

    case EDIT_DATA_USER: {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email
      };
    }

    default: {
      return state;
    }
  }
};
