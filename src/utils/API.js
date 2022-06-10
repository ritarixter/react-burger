import { setCookie } from "./setCookie";
const url = "https://norma.nomoreparties.space/api";

const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export async function getData() {
  const res = await fetch(`${url}/ingredients`);
  return responseCheck(res);
}

export async function dataOrder(data) {
  const res = await fetch(`${url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: data.map((item) => item._id),
    }),
  });
  return responseCheck(res);
}

export async function canPasswordReset(valueEmail) {
  const res = await fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: valueEmail,
    }),
  });
  return responseCheck(res);
}

export async function resetPassword(passwordValue, codeValue) {
  const res = await fetch(`${url}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: passwordValue,
      token: codeValue,
    }),
  });
  return responseCheck(res);
}

export async function registerUser(nameValue, emailValue, passwordValue) {
  const res = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    }),
  });
  return responseCheck(res);
}

const cookieCheck = (res) => {
  if (res.ok) {
    let authToken;
    console.log(res)
    res.headers.forEach((header) => {
      if (header.indexOf("Bearer") === 0) {
        // Отделяем схему авторизации от "полезной нагрузки токена",
        // Стараемся экономить память в куках (доступно 4кб)
        authToken = header.split("Bearer ")[1];
      }
    });
    if (authToken) {
      setCookie("token", authToken);
    }
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export async function refreshToken(refreshToken) {
  const res = await fetch(`${url}/auth/token `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "token": refreshToken
    }),
  });
  return responseCheck(res);
}

export async function authorizationUser(emailValue, passwordValue) {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
  });
  return responseCheck(res);
}

export async function logoutUser(refreshToken) {
  const res = await fetch(`${url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "token": refreshToken
    }),
  });
  return responseCheck(res);
}

export async function getDataUser(accessToken) {
  const res = await fetch(`${url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
  });
  return responseCheck(res);
}

export async function editProfile(accessToken,nameValue,emailValue) {
  const res = await fetch(`${url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
    body: JSON.stringify({
      name: nameValue,
      email: emailValue
    }),
  });
  return responseCheck(res);
}
