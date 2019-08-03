'use strict';

(function () {
    window.initBigPictures = function () {
      var pictures = document.querySelectorAll('.pictures .picture');
      var bigPicture = document.querySelector('.big-picture');
      var closeBigPictureBtn = document.querySelector('.big-picture__cancel');

      var setPictureInfo = function (pictureInfo) {
        var photo = bigPicture.querySelector('.big-picture__img img');
        var likesCount = bigPicture.querySelector('.likes-count');
        var description = bigPicture.querySelector('.social__caption');
        photo.src = pictureInfo.url;
        likesCount.textContent = pictureInfo.likes;
        description.textContent = pictureInfo.description;
        showComments(pictureInfo);
      };
      var calcPhotoIndex = function (photo) {
        return photo.className.split(' ').pop();
      };
      var openBigPicture = function (evt) {
        setPictureInfo(window.downloadedPictures[calcPhotoIndex(evt.currentTarget)]);
        document.querySelector('body').classList.add('modal-open');
        bigPicture.classList.remove('hidden');
      };
      var closeBigPicture = function () {
        document.querySelector('body').classList.remove('modal-open');
        bigPicture.classList.add('hidden');
      };
      var showComments = function (pictureInfo) {
        var commetsCout = 0;
        var totalcommentsCount = pictureInfo.comments.length;
        var commentElement = document.querySelector('#comment').content.querySelector('li');

        bigPicture.querySelector('.comments-count').textContent = totalcommentsCount + '';
        if (totalcommentsCount <= 5) {
          pictureInfo.comments.forEach(function (item)) {

          });
      } else {

      }
    };
    pictures.forEach(function (item, i) {
      item.addEventListener('click', openBigPicture);
    });
    closeBigPictureBtn.addEventListener('click', closeBigPicture);
  };
})();
