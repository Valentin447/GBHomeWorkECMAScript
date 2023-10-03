"use strict";

// Задание 1. Получение данных о пользователе.

// Реализуйте функцию getUserData, которая принимает идентификатор пользователя (ID) в качестве аргумента и использует fetch для получения данных о пользователе с заданным ID с удаленного сервера. Функция должна возвращать промис, который разрешается с данными о пользователе в виде объекта. Если пользователь с указанным ID не найден, промис должен быть отклонен с соответствующим сообщением об ошибке.

// Подсказка, с последовательностью действий:
// getUserData использует fetch для получения данных о пользователе с удаленного сервера. Если запрос успешен (с кодом 200), функция извлекает данные из ответа с помощью response.json() и возвращает объект с данными о пользователе. Если запрос неуспешен, функция отклоняет промис с сообщением об ошибке.

// Работа должна быть выполнена с API: https://reqres.in/

async function getUserData(id) {
  try {
    const response = await fetch("https://reqres.in/api/users?page=2");
    if (response.ok) {
      const arr = await response.json();
      for (const user of arr.data) {
        if (user.id === id) {
          return user;
        }
      }
      console.log(`Пользователь с id ${id} не найден в списке`);
    } else {
      console.log("От сервера вернулся статус не 200");
    }
  } catch (error) {
    console.log(error);
  }
}

getUserData(6).then((user) => console.log(user));
getUserData(7).then((user) => console.log(user));
getUserData(8).then((user) => console.log(user));

// Задание 2. Отправка данных на сервер.

// Реализуйте функцию saveUserData, которая принимает объект с данными о пользователе в качестве аргумента и использует fetch для отправки этих данных на удаленный сервер для сохранения. Функция должна возвращать промис, который разрешается, если данные успешно отправлены, или отклоняется в случае ошибки.

// *Подсказка *
// // Пример использования функции
// const user = {
//   "name": "John Doe",
//   "job": "unknown"
// };

// saveUserData(user)
//   .then(() => {
//     console.log('User data saved successfully');
//   })
//   .catch(error => {
//     console.log(error.message);
//   });
// saveUserData использует fetch для отправки данных о пользователе на удаленный сервер для сохранения. Она отправляет POST-запрос на URL-адрес /api/users с указанием типа содержимого application/json и сериализует объект с данными о пользователе в JSON-строку с помощью JSON.stringify(). Если запрос успешен (с кодом 201), функция разрешает промис. Если запрос неуспешен, функция отклоняет промис с сообщением об ошибке.
// Работа должна быть выполнена с API: https://reqres.in/

async function saveUserData(userObj) {
  const response = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userObj),
  });

  if (!response.ok) {
    console.log(`Error ${response.status}: ${response.statusText}`);
  } else {
    return await response.json();
  }
}

const user = {
  name: "John Doe",
  job: "unknown",
};

saveUserData(user)
  .then((resp) => {
    console.log("User data saved successfully");
    console.log(resp);
  })
  .catch((error) => {
    console.log(error.message);
  });
