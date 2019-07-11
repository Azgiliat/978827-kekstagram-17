'use strict';

const DEFAULT_SCALE = '100%';
var fileImgInput = document.querySelector('.img-upload__form input[type=file]');
var imgUpload = document.querySelector('.img-upload__overlay');
var imgPreview = imgUpload.querySelector('.img-upload__preview img');

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
    photo.classList.add('effects__preview--chrome1');
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

fileImgInput.addEventListener('change', function() {
  var effectItems = imgUpload.querySelectorAll('.effects__item .effects__preview');
  var photoURL = window.URL.createObjectURL(this.files[0]);
  var effectsList = document.querySelector('.effects__list');
  var scaleValue = imgUpload.querySelector('.scale__control--value');
  var scaleControlBig = imgUpload.querySelector('.scale__control--bigger');
  var scaleControlSmall = imgUpload.querySelector('.scale__control--smaller');
  imgUpload.classList.remove('hidden');
  imgPreview.src = photoURL;

  for (var i = 0; i < effectItems.length; i++) {
    effectItems[i].style.backgroundImage = 'url(' + photoURL + ')';
  }

  effectsList.addEventListener('click', function(evt) {
    removeFilters(imgPreview);
    addFilter(imgPreview, evt.target);
    evt.preventDefault();
  }, false);

  scaleValue.value = DEFAULT_SCALE;
  scaleControlBig.addEventListener('click', function() {
    if (canBeBigger(scaleValue.value)) {
      imgPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) + 25)/100 + ')';
      scaleValue.value = (parseInt(scaleValue.value, 10) + 25) + '%';
    }
  });
  scaleControlSmall.addEventListener('click', function() {
    if (canBeSmaller(scaleValue.value)) {
      imgPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) - 25)/100 + ')';
      scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
    }
  });
});
