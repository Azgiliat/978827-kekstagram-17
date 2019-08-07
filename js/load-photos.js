'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var xhr = new XMLHttpRequest();
  var okDonwloadPhotos = new Event('okDonwloadPhotos', {
    'bubbles': true,
    'cancelable': false
  });
  var errorDonwloadPhotos = new Event('errorDonwloadPhotos', {
    'bubbles': true,
    'cancelable': false
  });
  window.downloadedPictures = [];
  var processTimeoutError = function () {
    document.querySelector('body').dispatchEvent(errorDonwloadPhotos);
    xhr.removeEventListener('load', onXhrLoad);
  };
  var onXhrLoad = function () {
    var error;
    switch (xhr.status) {
      case 200:
        window.downloadedPictures = JSON.parse(xhr.response);
        document.querySelector('body').dispatchEvent(okDonwloadPhotos);
        clearTimeout(timeoutId);
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
      clearTimeout(timeoutId);
    }
    xhr.removeEventListener('load', onXhrLoad);
  };
  xhr.addEventListener('load', onXhrLoad);
  xhr.open('GET', URL);
  xhr.send();
  var timeoutId = setTimeout(processTimeoutError, 10000);
})();
