'use strict';

(function () {
  window.responseButtonsControl = function () {
    var closePopup = function (popup) {
      document.querySelector('main').removeChild(popup);
    };
    if (document.querySelector('.success__button')) {
      var successButton = document.querySelector('.success__button');
      var successSection = document.querySelector('.success');
      successButton.focus();
      var onSuccessButtonClick = function () {
        closePopup(successSection);
        successButton.removeEventListener('click', onSuccessButtonClick);
        successButton.removeEventListener('keydown', onSuccessButtonPress);
        successSection.removeEventListener('keydown', onSuccessSectionKeydown);
        document.removeEventListener('click', onDocumentCLick);
      };
      var onSuccessButtonPress = function (evt) {
        if (evt.which === window.keyCodes.enter) {
          closePopup(successSection);
          successButton.removeEventListener('click', onSuccessButtonClick);
          successButton.removeEventListener('keydown', onSuccessButtonPress);
          successSection.removeEventListener('keydown', onSuccessSectionKeydown);
          document.removeEventListener('click', onDocumentCLick);
        }
      };
      var onSuccessSectionKeydown = function (evt) {
        if (evt.which === window.keyCodes.esc) {
          closePopup(successSection);
        }
        successButton.removeEventListener('click', onSuccessButtonClick);
        successButton.removeEventListener('keydown', onSuccessButtonPress);
        successSection.removeEventListener('keydown', onSuccessSectionKeydown);
        document.removeEventListener('click', onDocumentCLick);
      };
      var onDocumentCLick = function () {
        closePopup(successSection);
        successButton.removeEventListener('click', onSuccessButtonClick);
        successButton.removeEventListener('keydown', onSuccessButtonPress);
        successSection.removeEventListener('keydown', onSuccessSectionKeydown);
        document.removeEventListener('click', onDocumentCLick);
      };
      successButton.addEventListener('click', onSuccessButtonClick);
      successButton.addEventListener('keydown', onSuccessButtonPress);
      successSection.addEventListener('keydown', onSuccessSectionKeydown);
      document.addEventListener('click', onDocumentCLick);
    }
    if (document.querySelector('.error__button')) {
      var errorButton = document.querySelectorAll('.error__button');
      var errorSection = document.querySelector('.error');
      var onErrorButtonClick = function () {
        closePopup(errorSection);
        errorButton.forEach(function (item) {
          item.removeEventListener('click', onErrorButtonClick);
          item.removeEventListener('keydown', onErrorButtonPress);
        });
        errorSection.removeEventListener('keydown', onErrorSectionKeydown);
        document.removeEventListener('click', onDocumentCLickError);
      };
      var onErrorButtonPress = function (evt) {
        if (evt.wich === window.keyCodes.enter) {
          closePopup(errorSection);
          errorButton.forEach(function (item) {
            item.removeEventListener('click', onErrorButtonClick);
            item.removeEventListener('keydown', onErrorButtonPress);
          });
          errorSection.removeEventListener('keydown', onErrorSectionKeydown);
          document.removeEventListener('click', onDocumentCLickError);
        }
      };
      var onErrorSectionKeydown = function (evt) {
        if (evt.which === window.keyCodes.esc) {
          closePopup(errorSection);
        }
        errorButton.forEach(function (item) {
          item.removeEventListener('click', onErrorButtonClick);
          item.removeEventListener('keydown', onErrorButtonPress);
        });
        errorSection.removeEventListener('keydown', onErrorSectionKeydown);
        document.removeEventListener('click', onDocumentCLickError);
      };
      var onDocumentCLickError = function () {
        closePopup(errorSection);
        errorButton.forEach(function (item) {
          item.removeEventListener('click', onErrorButtonClick);
          item.removeEventListener('keydown', onErrorButtonPress);
        });
        errorSection.removeEventListener('keydown', onErrorSectionKeydown);
        document.removeEventListener('click', onDocumentCLickError);
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
