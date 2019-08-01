'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.donwloadedPictures = [];

  var onXhrLoad = function () {
    var error;
    switch (xhr.status) {
      case 200:
        window.donwloadedPictures = JSON.parse(xhr.responseText);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      xhr.removeEventListener('load', onXhrLoad);
    }
    xhr.removeEventListener('load', onXhrLoad);
  };
  xhr.addEventListener('load', onXhrLoad);
  xhr.open('GET', URL);
  xhr.send();
})();
