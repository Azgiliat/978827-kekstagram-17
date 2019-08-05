'use strict';

(function () {
  window.initBigPictures = function () {
    var pictures = document.querySelectorAll('.pictures .picture');
    var bigPicture = document.querySelector('.big-picture');
    var closeBigPictureBtn = document.querySelector('.big-picture__cancel');
    var moreCommentsBtn = document.querySelector('.social__comments-loader');

    var calcPhotoIndex = function (photo) {
      return photo.className.split(' ').pop();
    };

    var showComments = function (pictureInfo) {
      var commentsCount = pictureInfo.commentsShowed;
      var totalcommentsCount = pictureInfo.comments.length;
      var commentTemplate = document.querySelector('#comment').content.querySelector('li');
      var commentsFragment = document.createDocumentFragment();
      bigPicture.querySelector('.comments-count').textContent = totalcommentsCount + '';
      pictureInfo.comments.slice(commentsCount, commentsCount + 5).forEach(function (item) {
        var commentElement = commentTemplate.cloneNode(true);
        commentElement.querySelector('.social__picture').src = item.avatar;
        commentElement.querySelector('.social__text').textContent = item.message;
        commentsFragment.appendChild(commentElement);
        pictureInfo.commentsShowed += 1;
      });
      return commentsFragment;
    };

    var setPictureInfo = function (pictureInfo) {
      var photo = bigPicture.querySelector('.big-picture__img img');
      var likesCount = bigPicture.querySelector('.likes-count');
      var description = bigPicture.querySelector('.social__caption');
      var comments = bigPicture.querySelector('.social__comments');
      photo.src = pictureInfo.url;
      likesCount.textContent = pictureInfo.likes;
      description.textContent = pictureInfo.description;
      comments.appendChild(showComments(pictureInfo));
    };


    var openBigPicture = function (evt) {
      var currentPhoto = window.downloadedPictures[calcPhotoIndex(evt.currentTarget)];
      currentPhoto.commentsShowed = 0;
      setPictureInfo(currentPhoto);
      document.querySelector('body').classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      moreCommentsBtn.addEventListener('click', function () {
        var comments = bigPicture.querySelector('.social__comments');
        comments.appendChild(showComments(currentPhoto));
        if (currentPhoto.commentsShowed === currentPhoto.comments.length) {
          moreCommentsBtn.classList.add('hidden');
        }
      });
    };

    var closeBigPicture = function () {
      document.querySelector('body').classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    };


    pictures.forEach(function (item, i) {
      item.addEventListener('click', openBigPicture);
    });
    closeBigPictureBtn.addEventListener('click', closeBigPicture);
  };
})();
