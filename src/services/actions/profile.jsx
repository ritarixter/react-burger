import { getDataUser, editProfile } from "../../utils/API";

export const GET_DATA_USER = 'GET_DATA_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const EDIT_DATA_USER = 'EDIT_DATA_USER'

export function getDataProfile(data) {
  return { type: GET_DATA_USER, data };
}

export function editDataProfile(data) {
  return { type: EDIT_DATA_USER, data };
}

export function logoutProfileUser() {
  return { type: LOGOUT_USER};
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

export function getData() {
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

