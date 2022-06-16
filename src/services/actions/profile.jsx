import { getDataUser, editProfile } from "../../utils/API";

export const GET_DATA_USER = 'GET_DATA_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const EDIT_DATA_USER = 'EDIT_DATA_USER'
export const AUTHORIZATION_SUCCESS = 'AUTHORIZATION_SUCCESS'
export const AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED'
export const FORGOT_PASSWORD_UNSUCCESS = 'FORGOT_PASSWORD_UNSUCCESS'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'

export function getDataProfile(data) {
  return { type: GET_DATA_USER, data };
}

export function wasOnPageForgotPassword() {
  return { type: FORGOT_PASSWORD_SUCCESS};
}

export function wasNotOnPageForgotPassword() {
  return { type: FORGOT_PASSWORD_UNSUCCESS};
}

export function editDataProfile(data) {
  return { type: EDIT_DATA_USER, data };
}

export function logoutProfileUser() {
  return { type: LOGOUT_USER};
}

export function authorizationSuccess() {
  return { type: AUTHORIZATION_SUCCESS};
}

export function authorizationFailed() {
  return { type: AUTHORIZATION_FAILED};
}


export function editData(nameValue,emailValue,passwordValue) {
  return function (dispatch) {
    editProfile(document.cookie,nameValue,emailValue)
      .then((res) => {
        const ApiData = res.user;
        dispatch(editDataProfile(ApiData));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке данных: ${err}`);
      });
  };
}

export function getDataUserProfile() {
  return function (dispatch) {
    getDataUser(document.cookie)
      .then((res) => {
        const ApiData = res.user;
        dispatch(getDataProfile(ApiData));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке данных: ${err}`);
      });
  };
}


