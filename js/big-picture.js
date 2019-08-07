'use strict';

(function () {
  window.initBigPictures = function () {
    var pictures = document.querySelectorAll('.pictures .picture');
    var bigPicture = document.querySelector('.big-picture');
    var closeBigPictureBtn = document.querySelector('.big-picture__cancel');
    var moreCommentsBtn = document.querySelector('.social__comments-loader');
    var comments = bigPicture.querySelector('.social__comments');
    var currentPhoto;

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
      var commentsCount = bigPicture.querySelector('.current-comments-count');
      photo.src = pictureInfo.url;
      likesCount.textContent = pictureInfo.likes;
      description.textContent = pictureInfo.description;
      comments.appendChild(showComments(pictureInfo));
      commentsCount.textContent = pictureInfo.commentsShowed + '';
    };

    var removeOldComments = function () {
      var oldComments = bigPicture.querySelectorAll('.social__comment');
      oldComments.forEach(function (item) {
        comments.removeChild(item);
      });
    };

    var onMoreCommentsBtnClick = function () {
      var commentsCount = bigPicture.querySelector('.current-comments-count');
      comments.appendChild(showComments(currentPhoto));
      commentsCount.textContent = currentPhoto.commentsShowed + '';
      if (currentPhoto.commentsShowed === currentPhoto.comments.length) {
        moreCommentsBtn.classList.add('hidden');
      }
    };

    var openBigPicture = function (evt) {
      currentPhoto = window.downloadedPictures[calcPhotoIndex(evt.currentTarget)];
      currentPhoto.commentsShowed = 0;
      removeOldComments();
      setPictureInfo(currentPhoto);
      if (currentPhoto.commentsShowed === currentPhoto.comments.length) {
        moreCommentsBtn.classList.add('hidden');
      }
      document.querySelector('body').classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      moreCommentsBtn.addEventListener('click', onMoreCommentsBtnClick);
    };

    var closeBigPicture = function () {
      document.querySelector('body').classList.remove('modal-open');
      bigPicture.classList.add('hidden');
      moreCommentsBtn.classList.remove('hidden');
      moreCommentsBtn.removeEventListener('click', onMoreCommentsBtnClick);
    };

    var onPictureKeydown = function (evt) {
      if (window.isEnter(evt)) {
        openBigPicture(evt);
      }
    };
    var onCloseBigPictureKeydown = function (evt) {
      if (window.isEnter(evt)) {
        closeBigPicture();
      }
    };

    pictures.forEach(function (item) {
      item.addEventListener('click', openBigPicture);
      item.addEventListener('keydown', onPictureKeydown);
    });
    closeBigPictureBtn.addEventListener('click', closeBigPicture);
    closeBigPictureBtn.addEventListener('keydown', onCloseBigPictureKeydown);
    document.addEventListener('keydown', function (evt) {
      if (evt.which === window.KeyCodes.ESC && document.querySelector('body').classList.contains('modal-open')) {
        closeBigPicture();
      }
    });
  };
})();
