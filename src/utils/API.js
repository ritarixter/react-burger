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
    console.log(res);
    res.headers.forEach((header) => {
      if (header.indexOf("Bearer") === 0) {
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

export async function refreshToken() {
  const res = await fetch(`${url}/auth/token `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  })
    .then(responseCheck(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("token", refreshData.refreshToken);
      document.cookie = refreshData.accessToken;
      return refreshData;
    });
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

export async function logoutUser() {
  const res = await fetch(`${url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  });
  return responseCheck(res);
}

export async function getDataUser(accessToken) {
  try {
    const res = await fetch(`${url}/auth/user`, {//После добавление проверки на акутальность refreshToken-а, стали появлятся ошибки 403 в actions/profile.jsx в getDataUserProfile, почему так...?
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
    return responseCheck(res);
  } catch (err) {//Проверка на актуальность refreshToken-a -------
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      const res = await fetch(`${url}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: refreshData.accessToken,
        },
      });
      return await responseCheck(res);
    } else {
      return Promise.reject(`Ошибка: ${err.status}`);
    }
  }
}

export async function editProfile(accessToken, nameValue, emailValue) {
  try {
    const res = await fetch(`${url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
      }),
    });
    return responseCheck(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      const res = await fetch(`${url}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: refreshData.accessToken,
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
        }),
      });
      return await responseCheck(res);
    } else {
      return Promise.reject(`Ошибка: ${err.status}`);
    }
  }
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
