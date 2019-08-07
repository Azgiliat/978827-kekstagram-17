'use strict';

(function () {
  window.responseButtonsControl = function () {
    var closePopup = function (popup) {
      document.querySelector('main').removeChild(popup);
    };
    if (document.querySelector('.success__button')) {
      var removeSuccessListeners = function () {
        successButton.removeEventListener('click', onSuccessButtonClick);
        successButton.removeEventListener('keydown', onSuccessButtonPress);
        successSection.removeEventListener('keydown', onSuccessSectionKeydown);
        document.removeEventListener('click', onDocumentCLick);
      };
      var successButton = document.querySelector('.success__button');
      var successSection = document.querySelector('.success');
      successButton.focus();
      var onSuccessButtonClick = function () {
        closePopup(successSection);
        removeSuccessListeners();
      };
      var onSuccessButtonPress = function (evt) {
        if (window.isEnter(evt)) {
          closePopup(successSection);
          removeSuccessListeners();
        }
      };
      var onSuccessSectionKeydown = function (evt) {
        if (evt.which === window.KeyCodes.ESC) {
          closePopup(successSection);
          removeSuccessListeners();
        }
      };
      var onDocumentCLick = function () {
        closePopup(successSection);
        removeSuccessListeners();
      };
      successButton.addEventListener('click', onSuccessButtonClick);
      successButton.addEventListener('keydown', onSuccessButtonPress);
      successSection.addEventListener('keydown', onSuccessSectionKeydown);
      document.addEventListener('click', onDocumentCLick);
    }
    if (document.querySelector('.error__button')) {
      var errorButton = document.querySelectorAll('.error__button');
      var errorSection = document.querySelector('.error');
      var removeErrorLiteners = function () {
        errorButton.forEach(function (item) {
          item.removeEventListener('click', onErrorButtonClick);
          item.removeEventListener('keydown', onErrorButtonPress);
        });
        errorSection.removeEventListener('keydown', onErrorSectionKeydown);
        document.removeEventListener('click', onDocumentCLickError);
      };
      var onErrorButtonClick = function () {
        closePopup(errorSection);
        removeErrorLiteners();
      };
      var onErrorButtonPress = function (evt) {
        if (window.isEnter(evt)) {
          closePopup(errorSection);
          removeErrorLiteners();
        }
      };
      var onErrorSectionKeydown = function (evt) {
        if (evt.which === window.KeyCodes.ESC) {
          closePopup(errorSection);
          removeErrorLiteners();
        }
      };
      var onDocumentCLickError = function () {
        closePopup(errorSection);
        removeErrorLiteners();
      };
      errorButton[0].focus();
      errorButton.forEach(function (item) {
        item.addEventListener('click', onErrorButtonClick);
        item.addEventListener('keydown', onErrorButtonPress);
      });
      errorSection.addEventListener('keydown', onErrorSectionKeydown);
      document.addEventListener('click', onDocumentCLickError);
    }
  };
})();
