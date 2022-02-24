const url = "https://norma.nomoreparties.space/api";

const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export function getData(){
 return fetch(`${url}/ingredients`)
 .then(responseCheck)
}

export function dataOrder(data){
  return fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: data.map((item) => item._id),
      }),
    })
      .then(responseCheck)
}