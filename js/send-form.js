'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  window.sendForm = function () {
    var imgForm = document.querySelector('.img-upload__form');
    var formData = new FormData(imgForm);
    var xhr = new XMLHttpRequest();
    var onFormLoad = function () {
      var error;
      var gotResponseConfig = {
        bubbles: true,
        cancelable: false
      };
      var responseOkChange = new Event('gotOkResponse', gotResponseConfig);
      var responseBadChange = new Event('gotBadResponse', gotResponseConfig);
      switch (xhr.status) {
        case 200:
          imgForm.dispatchEvent(responseOkChange);
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
        imgForm.dispatchEvent(responseBadChange);
      }
      xhr.removeEventListener('load', onFormLoad);
    };

    xhr.addEventListener('load', onFormLoad);
    xhr.open('POST', URL);
    xhr.send(formData);
  };
})();
