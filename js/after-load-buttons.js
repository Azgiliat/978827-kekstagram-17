'use strict';

(function () {
  window.responseButtonsControl = function () {
    var closePopup = function (popup) {
      document.querySelector('main').removeChild(popup);
    };
    if (document.querySelector('.success__button')) {
      var successButton = document.querySelector('.success__button');
      var successSection = document.querySelector('.success');
      var onSuccessButtonClick = function () {
        closePopup(successSection);
        successButton.removeEventListener('click', onSuccessButtonClick);
      };
      successButton.addEventListener('click', onSuccessButtonClick);
    }
    if (document.querySelector('.error__button')) {
      var errorButton = document.querySelector('.error__button');
      var errorSection = document.querySelector('.error');
      var onErrorButtonClick = function () {
        closePopup(errorSection);
        errorButton.removeEventListener('click', onErrorButtonClick);
      };
      errorButton.addEventListener('click', onErrorButtonClick);
    }
  };
})();
