'use strict';

(function () {
  var fileImgInput = document.querySelector('.img-upload__form input[type=file]');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgPreview = imgUpload.querySelector('.img-upload__preview img');
  var closeImgPreviewBtn = imgUpload.querySelector('.img-upload__cancel');
  var imgForm = document.querySelector('.img-upload__form');
  window.canClose = true;

  window.initFormValidity.startFormValidity();

  fileImgInput.addEventListener('change', function () {
    var hashtagInput = document.querySelector('.text__hashtags');
    var comment = document.querySelector('.text__description');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var effectsList = document.querySelector('.effects__list');
    var scaleControlBig = imgUpload.querySelector('.scale__control--bigger');
    var scaleControlSmall = imgUpload.querySelector('.scale__control--smaller');
    var effectLevelValue = imgUpload.querySelector('.effect-level__value');

    var setValuesToNull = function () {
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

    var closeImgPreview = function () {
      setValuesToNull();
      imgUpload.classList.add('hidden');
      removeFormListeners();
      closeImgPreviewBtn.removeEventListener('click', closeImgPreview);
      closeImgPreviewBtn.removeEventListener('keydown', oncloseImgPreviewBtnKeydown);
      effectLevelValue.removeEventListener('filterLvlChange', window.onFilterLvlChange);
      scaleControlSmall.removeEventListener('click', window.onScaleLevelSetSmaller);
      scaleControlSmall.removeEventListener('keydown', window.onScaleLevelSetSmallerKeydown);
      scaleControlBig.removeEventListener('click', window.onScaleLevelSetBigger);
      scaleControlBig.removeEventListener('keydown', window.onScaleLevelSetBiggerKeydown);
      effectsList.removeEventListener('click', window.onEffectsListChange, false);
      effectsList.removeEventListener('keydown', window.onEffectsListChangeKeydown);
    };
    var oncloseImgPreviewBtnKeydown = function (evt) {
      if (window.KeyCodes.isEnter(evt)) {
        closeImgPreview();
      }
    };
    var onDocumentKeydown = function (evt) {
      if (evt.which === window.KeyCodes.ESC && window.canClose) {
        closeImgPreview();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    imgUpload.classList.remove('hidden');

    window.initImgControls();

    closeImgPreviewBtn.addEventListener('click', closeImgPreview);
    closeImgPreviewBtn.addEventListener('keydown', oncloseImgPreviewBtnKeydown);
    document.addEventListener('keydown', onDocumentKeydown);

    var onFormSubmit = function (evt) {
      evt.preventDefault();
      if (window.initFormValidity.formValidtity) {
        window.sendForm();
      }
    };
    var onFormOk = function () {
      var successElement = successTemplate.cloneNode(true);
      document.querySelector('main').appendChild(successElement);
      setValuesToNull();
      imgUpload.classList.add('hidden');
      window.responseButtonsControl();
      removeFormListeners();
    };
    var onFormError = function () {
      var errorElement = errorTemplate.cloneNode(true);
      document.querySelector('main').appendChild(errorElement);
      setValuesToNull();
      imgUpload.classList.add('hidden');
      window.responseButtonsControl();
      removeFormListeners();
    };
    imgForm.addEventListener('submit', onFormSubmit);
    imgForm.addEventListener('gotOkResponse', onFormOk);
    imgForm.addEventListener('gotBadResponse', onFormError);
  });
})();
