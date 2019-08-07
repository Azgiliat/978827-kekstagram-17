'use strict';

(function () {
  var DEFAULT_SCALE = '100%';
  var DEFAULT_FILTER_VALUE = '100';
  var BIGGER = true;
  var SMALLER = false;
  window.initImgControls = function () {
    var Filters = {
      NONE: 'effects__preview--none',
      CHROME: 'effects__preview--chrome',
      SEPIA: 'effects__preview--sepia',
      MARVIN: 'effects__preview--marvin',
      PHOBOS: 'effects__preview--phobos',
      HEAT: 'effects__preview--heat'
    };
    var fileImgInput = document.querySelector('.img-upload__form input[type=file]');
    var imgUpload = document.querySelector('.img-upload__overlay');
    var imgPreview = imgUpload.querySelector('.img-upload__preview img');
    var effectItems = imgUpload.querySelectorAll('.effects__item .effects__preview');
    var photoURL = window.URL.createObjectURL(fileImgInput.files[0]);
    var effectsList = document.querySelector('.effects__list');
    var scaleValue = imgUpload.querySelector('.scale__control--value');
    var scaleControlBig = imgUpload.querySelector('.scale__control--bigger');
    var scaleControlSmall = imgUpload.querySelector('.scale__control--smaller');
    var effectLevelValue = imgUpload.querySelector('.effect-level__value');
    var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
    var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
    var slider = imgUpload.querySelector('.effect-level');

    window.removeFilters = function (photo) {
      for (var key in Filters) {
        if (photo.classList.contains(Filters[key])) {
          photo.classList.remove(Filters[key]);
        }
      }
    };
    var addFilter = function (photo, filter) {
      for (var key in Filters) {
        if (filter.classList.contains(Filters[key])) {
          photo.classList.add(Filters[key]);
        }
      }
    };
    var canBeBigger = function (scale) {
      return (parseInt(scale, 10) >= 100) ? 0 : 1;
    };
    var canBeSmaller = function (scale) {
      return (parseInt(scale, 10) <= 25) ? 0 : 1;
    };

    var filterLevelSet = function () {
      if (imgPreview.classList.contains(Filters.NONE)) {
        imgPreview.style.filter = null;
        slider.style.display = 'none';
      }
      if (imgPreview.classList.contains(Filters.CHROME)) {
        imgPreview.style.filter = 'grayscale(' + (effectLevelValue.value / 100) + ')';
        slider.style.display = null;
      }
      if (imgPreview.classList.contains(Filters.SEPIA)) {
        imgPreview.style.filter = 'sepia(' + (effectLevelValue.value / 100) + ')';
        slider.style.display = null;
      }
      if (imgPreview.classList.contains(Filters.MARVIN)) {
        imgPreview.style.filter = 'invert(' + (effectLevelValue.value) + '%)';
        slider.style.display = null;
      }
      if (imgPreview.classList.contains(Filters.PHOBOS)) {
        imgPreview.style.filter = 'blur(' + (effectLevelValue.value / 100) * 3 + 'px)';
        slider.style.display = null;
      }
      if (imgPreview.classList.contains(Filters.HEAT)) {
        imgPreview.style.filter = 'brightness(' + (effectLevelValue.value / 100) * 2 + 1 + ')';
        slider.style.display = null;
      }
    };
    var scaleLevelSet = function (biggerOrSmaller, defaultScale) {
      if (
        defaultScale === true) {
        imgPreview.style.transform = 'scale(1)';
      } else {
        if (biggerOrSmaller === true) {
          if (canBeBigger(scaleValue.value)) {
            imgPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) + 25) / 100 + ')';
            scaleValue.value = (parseInt(scaleValue.value, 10) + 25) + '%';
          }
        } else {
          if (canBeSmaller(scaleValue.value)) {
            imgPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) - 25) / 100 + ')';
            scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
          }
        }
      }
    };
    var setDefaultValues = function () {
      scaleValue.value = DEFAULT_SCALE;
      effectLevelValue.value = DEFAULT_FILTER_VALUE;
      effectLevelPin.style.left = effectLevelValue.value + '%';
      effectLevelDepth.style.width = effectLevelValue.value + '%';
      scaleLevelSet(BIGGER, true);
      filterLevelSet();
    };
    var effectsListChange = function (evt) {
      if (evt.target.tagName !== 'INPUT') {
        window.removeFilters(imgPreview);
        addFilter(imgPreview, evt.target);
        setDefaultValues();
      }
    };
    window.onFilterLvlChange = function () {
      filterLevelSet();
    };
    window.onScaleLevelSetSmaller = function () {
      scaleLevelSet(SMALLER, false);
    };
    window.onScaleLevelSetSmallerKeydown = function (evt) {
      if (window.KeyCodes.isEnter(evt)) {
        scaleLevelSet(SMALLER, false);
      }
    };
    window.onScaleLevelSetBigger = function () {
      scaleLevelSet(BIGGER, false);
    };
    window.onScaleLevelSetBiggerKeydown = function (evt) {
      if (window.KeyCodes.isEnter(evt)) {
        scaleLevelSet(BIGGER, false);
      }
    };
    window.onEffectsListChange = function (evt) {
      effectsListChange(evt);
    };
    window.onEffectsListChangeKeydown = function (evt) {
      if (window.KeyCodes.isEnter(evt)) {
        effectsListChange(evt);
      }
    };
    slider.style.display = 'none';
    imgPreview.src = photoURL;
    for (var i = 0; i < effectItems.length; i++) {
      effectItems[i].style.backgroundImage = 'url(' + photoURL + ')';
    }
    setDefaultValues();

    effectsList.addEventListener('click', window.onEffectsListChange, false);
    effectsList.addEventListener('keydown', window.onEffectsListChangeKeydown);
    scaleControlBig.addEventListener('click', window.onScaleLevelSetBigger);
    scaleControlBig.addEventListener('keydown', window.onScaleLevelSetBiggerKeydown);
    scaleControlSmall.addEventListener('click', window.onScaleLevelSetSmaller);
    scaleControlSmall.addEventListener('keydown', window.onScaleLevelSetSmallerKeydown);
    effectLevelValue.addEventListener('filterLvlChange', window.onFilterLvlChange);
  };
})();
