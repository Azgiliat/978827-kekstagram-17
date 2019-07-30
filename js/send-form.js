(function () {
  window.sendForm = function () {
    var imgForm = document.querySelector('.img-upload__form');
    var URL = 'https://js.dump.academy/kekstagram';

    var logError = function (message) {
      console.error(message);
    };
    var logSuccess = function (message) {
      console.log(message);
    };


    var formData = new FormData(imgForm);
    var xhr = new XMLHttpRequest();


    xhr.addEventListener('load', function () {
      var error;
      var gotResponseConfig = {
        bubbles: true,
        cancelable: false
      };
      var responseOkChange = new Event('gotOkResponse', gotResponseConfig);
      var responseBadChange = new Event('gotBadResponse', gotResponseConfig);
      switch (xhr.status) {
        case 200:
          logSuccess(xhr.response);
          imgForm.dispatchEvent(responseOkChange);
          break;
        case 400:
          error = 'Неверный запрос';
          imgForm.dispatchEvent(responseBadChange);
          break;
        case 401:
          error = 'Пользователь не авторизован';
          imgForm.dispatchEvent(responseBadChange);
          break;
        case 404:
          error = 'Ничего не найдено';
          imgForm.dispatchEvent(responseBadChange);
          break;
        default:
          imgForm.dispatchEvent(responseBadChange);
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        imgForm.dispatchEvent(responseBadChange);
        logError(error);
      }
    });
    xhr.open("POST", URL);
    xhr.send(formData);
  }
})();
