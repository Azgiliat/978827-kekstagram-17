(function () {
  window.responseButtonsControl = function () {
    if (document.querySelector('.success__button')) {
      var successButton = document.querySelector('.success__button');
      var successSection = document.querySelector('.success');
    }
    if (document.querySelector('.error__button')) {
      var errorButton = document.querySelector('.error__button');
      var errorSection = document.querySelector('.error');
    }
    var closePopup = function (popup) {
      document.querySelector('main').removeChild(popup);
    };
    var onSuccessButtonClick = function () {
      closePopup(successSection);
      successButton.removeEventListener(onSuccessButtonClick);
    };
    var onErrorButtonClick = function () {
      closePopup(errorSection);
      errorButton.removeEventListener(onErrorButtonClick);
    };

    successButton.addEventListener('click', onSuccessButtonClick);

    errorButton.addEventListener('click', onErrorButtonClick);
  }
})();
