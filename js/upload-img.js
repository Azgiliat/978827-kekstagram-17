'use strict';

(function () {
  var DEFAULT_SCALE = '100%';
  var DEFAULT_FILTER_VALUE = '100';
  var BIGGER = true;
  var SMALLER = false;
  var fileImgInput = document.querySelector('.img-upload__form input[type=file]');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgPreview = imgUpload.querySelector('.img-upload__preview img');
  var filters = {
    none: 'effects__preview--none',
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat'
  };

  var removeFilters = function (photo) {
    if (photo.classList.contains(filters.none)) {
      photo.classList.remove(filters.none);
    }
    if (photo.classList.contains(filters.chrome)) {
      photo.classList.remove(filters.chrome);
    }
    if (photo.classList.contains(filters.sepia)) {
      photo.classList.remove(filters.sepia);
    }
    if (photo.classList.contains(filters.marvin)) {
      photo.classList.remove(filters.marvin);
    }
    if (photo.classList.contains(filters.phobos)) {
      photo.classList.remove(filters.phobos);
    }
    if (photo.classList.contains(filters.heat)) {
      photo.classList.remove(filters.heat);
    }
  };
  var addFilter = function (photo, filter) {
    if (filter.classList.contains(filters.none)) {
      photo.classList.add(filters.none);
    }
    if (filter.classList.contains(filters.chrome)) {
      photo.classList.add(filters.chrome);
    }
    if (filter.classList.contains(filters.sepia)) {
      photo.classList.add(filters.sepia);
    }
    if (filter.classList.contains(filters.marvin)) {
      photo.classList.add(filters.marvin);
    }
    if (filter.classList.contains(filters.phobos)) {
      photo.classList.add(filters.phobos);
    }
    if (filter.classList.contains(filters.heat)) {
      photo.classList.add(filters.heat);
    }
  };
  var canBeBigger = function (scale) {
    return (parseInt(scale, 10) >= 100) ? 0 : 1;
  };
  var canBeSmaller = function (scale) {
    return (parseInt(scale, 10) <= 25) ? 0 : 1;
  };


  var valuesToNull = function () {
    removeFilters(imgPreview);
    imgPreview.style.filter = null;
    imgPreview.style.transform = null;
    fileImgInput.value = null;
  };

  fileImgInput.addEventListener('change', function () {
    var effectItems = imgUpload.querySelectorAll('.effects__item .effects__preview');
    var photoURL = window.URL.createObjectURL(fileImgInput.files[0]);
    var effectsList = document.querySelector('.effects__list');
    var scaleValue = imgUpload.querySelector('.scale__control--value');
    var scaleControlBig = imgUpload.querySelector('.scale__control--bigger');
    var scaleControlSmall = imgUpload.querySelector('.scale__control--smaller');
    var effectLevelValue = imgUpload.querySelector('.effect-level__value');
    var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
    var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
    var closeImgPreview = imgUpload.querySelector('.img-upload__cancel');

    var filterLevelSet = function () {
      if (imgPreview.classList.contains(filters.none)) {
        imgPreview.style.filter = null;
      }
      if (imgPreview.classList.contains(filters.chrome)) {
        imgPreview.style.filter = 'grayscale(' + (effectLevelValue.value / 100) + ')';
      }
      if (imgPreview.classList.contains(filters.sepia)) {
        imgPreview.style.filter = 'sepia(' + (effectLevelValue.value / 100) + ')';
      }
      if (imgPreview.classList.contains(filters.marvin)) {
        imgPreview.style.filter = 'invert(' + (effectLevelValue.value) + '%)';
      }
      if (imgPreview.classList.contains(filters.phobos)) {
        imgPreview.style.filter = 'blur(' + (effectLevelValue.value / 100) * 3 + 'px)';
      }
      if (imgPreview.classList.contains(filters.heat)) {
        imgPreview.style.filter = 'brightness(' + (effectLevelValue.value / 100) * 2 + 1 + ')';
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

    imgUpload.classList.remove('hidden');
    imgPreview.src = photoURL;
    for (var i = 0; i < effectItems.length; i++) {
      effectItems[i].style.backgroundImage = 'url(' + photoURL + ')';
    }
    setDefaultValues();

    effectsList.addEventListener('click', function (evt) {
      evt.preventDefault();

      removeFilters(imgPreview);
      addFilter(imgPreview, evt.target);

      setDefaultValues();
    }, false);
    scaleControlBig.addEventListener('click', function () {
      scaleLevelSet(BIGGER, false);
    });
    scaleControlSmall.addEventListener('click', function () {
      scaleLevelSet(SMALLER, false);
    });
    effectLevelValue.addEventListener('filterLvlChange', function () {
      filterLevelSet();
    });
    closeImgPreview.addEventListener('click', function (evt) {
      evt.preventDefault();
      valuesToNull();
      imgUpload.classList.add('hidden');
    });
  });
})();
