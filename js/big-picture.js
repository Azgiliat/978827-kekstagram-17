'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');

  pictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture') || evt.target.classList.contains('picture__img') || evt.target.classList.contains('picture__info')) {
      document.querySelector('body').classList.add('modal-open');
      bigPicture.classList.remove('hidden');
    }
  });
})();
