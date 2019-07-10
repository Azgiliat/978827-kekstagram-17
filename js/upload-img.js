var fileImgInput = document.querySelector('.img-upload__form input[type=file]');
var imgUpload = document.querySelector('.img-upload__overlay');
var imgPreview = imgUpload.querySelector('.img-upload__preview img');

var removeFilters = function(photo) {
  if (photo.classList.contains('effects__preview--none')) {
    photo.classList.remove('effects__preview--none');
    console.log('delete chrome');
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
    console.log('add chrome');
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

fileImgInput.addEventListener('change', function() {
  var effectItems = imgUpload.querySelectorAll('.effects__item .effects__preview');
  var photoURL = window.URL.createObjectURL(this.files[0]);

  imgUpload.classList.remove('hidden');
  imgPreview.src = photoURL;

  for (var i = 0; i < effectItems.length; i++) {
    effectItems[i].style = 'background-image: url(' + photoURL + ')';
  }
  var effectsList = imgUpload.querySelector('.effects__list');
  effectsList.addEventListener('click', function(evt){
    removeFilters(imgPreview);
    addFilter(imgPreview, evt.target);
    evt.stopPropagation();
  }, false);
});
