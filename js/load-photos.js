'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.downloadedPictures = [];

  var onXhrLoad = function () {
    var error;
    var okDonwloadPhotos = new Event('okDonwloadPhotos', {
      'bubbles': true,
      'cancelable': false
    });
    var errorDonwloadPhotos = new Event('errorDonwloadPhotos', {
      'bubbles': true,
      'cancelable': false
    });
    switch (xhr.status) {
      case 200:
        window.downloadedPictures = JSON.parse(xhr.response);
        document.querySelector('body').dispatchEvent(okDonwloadPhotos);
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
      document.querySelector('body').dispatchEvent(errorDonwloadPhotos);
    }
    xhr.removeEventListener('load', onXhrLoad);
  };
  xhr.addEventListener('load', onXhrLoad);
  xhr.open('GET', URL);
  xhr.send();
})();
