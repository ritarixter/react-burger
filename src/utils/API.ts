import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";
const url = "https://norma.nomoreparties.space/api";

const responseCheck = (res: {
  ok: boolean;
  json: () => any;
  status: number;
}) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

export function getData() {
  return fetch(`${url}/ingredients`).then(responseCheck);
}

export function dataOrder(data: { _id: string }[]) {
  return fetch(`${url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: data.map((item) => item._id),
    }),
  }).then(responseCheck);
}

export function getOrderId(id: string) {
  return fetch(`${url}/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(responseCheck);
}

export function canPasswordReset(valueEmail: string) {
  return fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: valueEmail,
    }),
  }).then(responseCheck);
}

export function resetPassword(passwordValue: string, codeValue: string) {
  return fetch(`${url}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: passwordValue,
      token: codeValue,
    }),
  }).then(responseCheck);
}

export function registerUser(
  nameValue: string,
  emailValue: string,
  passwordValue: string
) {
  return fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    }),
  }).then(responseCheck);
}

export function refreshToken() {
  return fetch(`${url}/auth/token `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  })
    .then(responseCheck)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("token", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      return refreshData;
    });
}

export function authorizationUser(emailValue: string, passwordValue: string) {
  return fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
  }).then(responseCheck);
}

export async function logoutUser() {
  return fetch(`${url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then(responseCheck);
}

export function getDataUser() {
  return fetch(`${url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  })
    .then(responseCheck)
    .catch((err) => {
      if (err === 403) {
        refreshToken().then((refreshData) => {
          return fetch(`${url}/auth/user`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: refreshData.accessToken,
            },
          }).then(responseCheck);
        });
      } else {
        return Promise.reject(`Ошибка: ${err.status}`);
      }
    });
}

export function editProfile(nameValue: string, emailValue: string) {
  return fetch(`${url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      name: nameValue,
      email: emailValue,
    }),
  })
    .then(responseCheck)
    .catch((err) => {
      if (err === 403) {
        refreshToken().then((refreshData) => {
          return fetch(`${url}/auth/user`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: getCookie("accessToken"),
            },
            body: JSON.stringify({
              name: refreshData.nameValue,
              email: refreshData.emailValue,
            }),
          }).then(responseCheck);
        });
      } else {
        return Promise.reject(`Ошибка: ${err.status}`);
      }
    });
}

/*const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url,options);
    return await responseCheck(res)
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken

      const res = await fetch(url, options);
      return await responseCheck(res)
    }

    else {
      return Promise.reject(`Ошибка: ${err.status}`);
    }
  }
}*/
