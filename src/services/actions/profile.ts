import { getDataUser, editProfile } from "../../utils/API";

export const GET_DATA_USER:'GET_DATA_USER' = "GET_DATA_USER";
export const LOGOUT_USER:'LOGOUT_USER' = "LOGOUT_USER";
export const EDIT_DATA_USER:'EDIT_DATA_USER' = "EDIT_DATA_USER";
export const AUTHORIZATION_SUCCESS:'AUTHORIZATION_SUCCESS' = "AUTHORIZATION_SUCCESS";
export const AUTHORIZATION_FAILED:'AUTHORIZATION_FAILED' = "AUTHORIZATION_FAILED";
export const FORGOT_PASSWORD_UNSUCCESS:'FORGOT_PASSWORD_UNSUCCESS' = "FORGOT_PASSWORD_UNSUCCESS";
export const FORGOT_PASSWORD_SUCCESS:'FORGOT_PASSWORD_SUCCESS' = "FORGOT_PASSWORD_SUCCESS";
export const AUTH_CHECKED:'AUTH_CHECKED' = 'AUTH_CHECKED'

interface IDataProfile {
  name : string;
  email: string;
}

interface IGetDataProfile {
  type: typeof GET_DATA_USER
  data: IDataProfile
}

interface IWasOnPageForgotPassword {
  type: typeof FORGOT_PASSWORD_SUCCESS
}

interface IWasNotOnPageForgotPassword {
  type: typeof FORGOT_PASSWORD_UNSUCCESS
}

interface IEditDataProfile {
  type: typeof EDIT_DATA_USER
  data: IDataProfile
}

interface ILogoutProfileUser {
  type: typeof LOGOUT_USER
}

interface IAuthorizationSuccess {
  type: typeof AUTHORIZATION_SUCCESS
}

interface IAuthorizationFailed {
  type: typeof AUTHORIZATION_FAILED
}

interface IAuthorizationChecked {
  type: typeof AUTH_CHECKED
}

export function getDataProfile(data:IDataProfile):IGetDataProfile {
  return { type: GET_DATA_USER, data };
}

export function wasOnPageForgotPassword():IWasOnPageForgotPassword {
  return { type: FORGOT_PASSWORD_SUCCESS };
}

export function wasNotOnPageForgotPassword():IWasNotOnPageForgotPassword {
  return { type: FORGOT_PASSWORD_UNSUCCESS };
}

export function editDataProfile(data:IDataProfile):IEditDataProfile {
  return { type: EDIT_DATA_USER, data };
}

export function logoutProfileUser():ILogoutProfileUser {
  return { type: LOGOUT_USER };
}

export function authorizationSuccess():IAuthorizationSuccess {
  return { type: AUTHORIZATION_SUCCESS };
}

export function authorizationFailed():IAuthorizationFailed {
  return { type: AUTHORIZATION_FAILED };
}

export function authorizationChecked():IAuthorizationChecked {
  return { type: AUTH_CHECKED };
}

export type TProfileActions = 
    | IGetDataProfile
  | IWasOnPageForgotPassword
  | IWasNotOnPageForgotPassword
  | IEditDataProfile
  | ILogoutProfileUser
  | IAuthorizationSuccess
  | IAuthorizationFailed
  | IAuthorizationChecked;


export function editData(nameValue:string, emailValue:string) {
  return function (dispatch: (arg0: IEditDataProfile) => void) {
    editProfile(nameValue, emailValue)
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
  return function (dispatch: (arg0: IGetDataProfile | IAuthorizationChecked) => void) {
    getDataUser()
      .then((res) => {
        const ApiData = res.user;
        dispatch(getDataProfile(ApiData));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке данных: ${err}`);
      })
      .finally(() => {
        dispatch(authorizationChecked());
      });
  };
}
