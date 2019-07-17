'use strict';

const DEFAULT_SCALE = '100%';
const DEFAULT_FILTER_VALUE = '100';
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

var removeFilters = function(photo) {
  if (photo.classList.contains('effects__preview--none')) {
    photo.classList.remove('effects__preview--none');
  }
  if (photo.classList.contains('effects__preview--chrome')) {
    photo.classList.remove('effects__preview--chrome');
  }
  if (photo.classList.contains('effects__preview--sepia')) {
    photo.classList.remove('effects__preview--sepia');
  }
  if (photo.classList.contains('effects__preview--marvin')) {
    photo.classList.remove('effects__preview--marvin');
  }
  if (photo.classList.contains('effects__preview--phobos')) {
    photo.classList.remove('effects__preview--phobos');
  }
  if (photo.classList.contains('effects__preview--heat')) {
    photo.classList.remove('effects__preview--heat');
  }
};
var addFilter = function(photo, filter) {
  if (filter.classList.contains('effects__preview--none')) {
    photo.classList.add('effects__preview--none');
  }
  if (filter.classList.contains('effects__preview--chrome')) {
    photo.classList.add('effects__preview--chrome');
  }
  if (filter.classList.contains('effects__preview--sepia')) {
    photo.classList.add('effects__preview--sepia');
  }
  if (filter.classList.contains('effects__preview--marvin')) {
    photo.classList.add('effects__preview--marvin');
  }
  if (filter.classList.contains('effects__preview--phobos')) {
    photo.classList.add('effects__preview--phobos');
  }
  if (filter.classList.contains('effects__preview--heat')) {
    photo.classList.add('effects__preview--heat');
  }
};
var canBeBigger = function(scale) {
  return scale === '100%' ? 0 : 1;
};
var canBeSmaller = function(scale) {
  return scale === '25%' ? 0 : 1;
};
var effectLevelCalculate = function(levelPin, levelLine, shift) {
  var pinCoords = levelPin.getBoundingClientRect();
  var lineCoords = levelLine.getBoundingClientRect();
  return Math.round(((pinCoords.left + (pinCoords.right - pinCoords.left) / 2) - shift - lineCoords.left) / levelLine.offsetWidth * 100);
};


fileImgInput.addEventListener('change', function() {
  var effectItems = imgUpload.querySelectorAll('.effects__item .effects__preview');
  var photoURL = window.URL.createObjectURL(this.files[0]);
  var effectsList = document.querySelector('.effects__list');
  var scaleValue = imgUpload.querySelector('.scale__control--value');
  var scaleControlBig = imgUpload.querySelector('.scale__control--bigger');
  var scaleControlSmall = imgUpload.querySelector('.scale__control--smaller');
  var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
  var effectLevelLine = imgUpload.querySelector('.effect-level__line');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
  var effectLevelValue = imgUpload.querySelector('.effect-level__value');

  var filterLevelSet = function() {
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

  imgUpload.classList.remove('hidden');
  imgPreview.src = photoURL;
  for (var i = 0; i < effectItems.length; i++) {
    effectItems[i].style.backgroundImage = 'url(' + photoURL + ')';
  }

  effectsList.addEventListener('click', function(evt) {
    removeFilters(imgPreview);
    addFilter(imgPreview, evt.target);
    scaleValue.value = DEFAULT_SCALE;
    effectLevelValue.value = DEFAULT_FILTER_VALUE;
    imgPreview.style.filter = null;
    evt.preventDefault();
  }, false);

  scaleValue.value = DEFAULT_SCALE;
  scaleControlBig.addEventListener('click', function() {
    if (canBeBigger(scaleValue.value)) {
      imgPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) + 25) / 100 + ')';
      scaleValue.value = (parseInt(scaleValue.value, 10) + 25) + '%';
    }
  });
  scaleControlSmall.addEventListener('click', function() {
    if (canBeSmaller(scaleValue.value)) {
      imgPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) - 25) / 100 + ')';
      scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
    }
  });

  var coordsLimits = {
    maxX: effectLevelLine.getBoundingClientRect().left + effectLevelLine.offsetWidth,
    minX: effectLevelLine.getBoundingClientRect().left
  };
  effectLevelPin.addEventListener('mousedown', function(evt) {
    var onMouseUp = function(evt) {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
    var onMouseMove = function(evt) {
      var shift = startCoords - evt.clientX;
      startCoords = evt.clientX;
      if (effectLevelCalculate(effectLevelPin, effectLevelLine, shift) > 100) {
        effectLevelPin.style.left = '100%';
        effectLevelDepth.style.width = '100%';
        effectLevelValue.value = 100;
        filterLevelSet();
        startCoords = coordsLimits.maxX;
      }
      if (effectLevelCalculate(effectLevelPin, effectLevelLine, shift) < 0) {
        effectLevelPin.style.left = '0%';
        effectLevelDepth.style.width = '0%';
        effectLevelValue.value = 0;
        filterLevelSet();
        startCoords = coordsLimits.minX;
      } else {
        effectLevelPin.style.left = effectLevelCalculate(effectLevelPin, effectLevelLine, shift) + '%';
        effectLevelDepth.style.width = effectLevelCalculate(effectLevelPin, effectLevelLine, shift) + '%';
        console.log(effectLevelValue);
        console.log(effectLevelValue.value);
        effectLevelValue.value = effectLevelCalculate(effectLevelPin, effectLevelLine, shift);
        filterLevelSet();
        startCoords = evt.clientX;
      }
    };
    var startCoords = evt.clientX;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});