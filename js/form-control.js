'use strict';

(function () {
  var fileImgInput = document.querySelector('.img-upload__form input[type=file]');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgPreview = imgUpload.querySelector('.img-upload__preview img');
  var closeImgPreview = imgUpload.querySelector('.img-upload__cancel');
  var imgForm = document.querySelector('.img-upload__form');

  fileImgInput.addEventListener('change', function () {
    var hashtagInput = document.querySelector('.text__hashtags');
    var comment = document.querySelector('.text__description');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var valuesToNull = function () {
      window.removeFilters(imgPreview);
      imgPreview.style.filter = null;
      imgPreview.style.transform = null;
      fileImgInput.value = null;
      hashtagInput.value = '';
      comment.value = '';
    };
    var removeFormListeners = function () {
      imgForm.removeEventListener('submit', onFormSubmit);
      imgForm.removeEventListener('gotOkResponse', onFormOk);
      imgForm.removeEventListener('gotBadResponse', onFormError);
    };


    imgUpload.classList.remove('hidden');

    window.imgControls();
    closeImgPreview.addEventListener('click', function (evt) {
      evt.preventDefault();
      valuesToNull();
      imgUpload.classList.add('hidden');
      removeFormListeners();
    });

    var onFormSubmit = function (evt) {
      evt.preventDefault();
      if (window.initFormValidity()) {
        window.sendForm();
      }
    };
    var onFormOk = function () {
      var successElement = successTemplate.cloneNode(true);
      document.querySelector('main').appendChild(successElement);
      valuesToNull();
      imgUpload.classList.add('hidden');
      window.responseButtonsControl();
      removeFormListeners();
    };
    var onFormError = function () {
      var errorElement = errorTemplate.cloneNode(true);
      document.querySelector('main').appendChild(errorElement);
      imgUpload.classList.add('hidden');
      window.responseButtonsControl();
      removeFormListeners();
    };

    imgForm.addEventListener('submit', onFormSubmit);
    imgForm.addEventListener('gotOkResponse', onFormOk);
    imgForm.addEventListener('gotBadResponse', onFormError);
  });
})();
