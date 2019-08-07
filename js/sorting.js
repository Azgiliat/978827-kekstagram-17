'use strict';

(function() {
  window.initSorting = function() {
    var imgFilters = document.querySelector('.img-filters');
    var filterBtns = {
      discussedBtn: document.querySelector('#filter-discussed'),
      popularBtn: document.querySelector('#filter-popular'),
      newBtn: document.querySelector('#filter-new')
    };
    var pictures = document.querySelectorAll('.picture');

    var randMinMax = function(min, max) {
      return Math.round(min + Math.random() * (max - min));
    };

    var compareOrder = function(a, b) {
      if (a.commentsCount < b.commentsCount) {
        return 1;
      }
      if (a.commentsCount === b.commentsCount) {
        return 0;
      }
      if (a.commentsCount > b.commentsCount) {
        return -1;
      }
      return -2;
    };

    var toggleBtn = function(currentBtn) {
      for (var key in filterBtns) {
        if (filterBtns[key].classList.contains('img-filters__button--active')) {
          filterBtns[key].classList.remove('img-filters__button--active');
        }
      }
      currentBtn.classList.add('img-filters__button--active');
    };

    var showDiscussedPhotos = function() {
      var sortingArray = [];
      restoreDefaults();
      window.downloadedPictures.forEach(function(item, i) {
        item.order = i + 1;
        sortingArray[i] = {
          number: i,
          order: item.order,
          commentsCount: item.comments.length
        };
      });
      sortingArray.sort(compareOrder);
      sortingArray.forEach(function(item, i) {
        item.order = i + 1;
      });
      sortingArray.forEach(function(item) {
        pictures[item.number].style.order = item.order + '';
      });
      toggleBtn(filterBtns.discussedBtn);
    };

    var restoreDefaults = function() {
      pictures.forEach(function(item) {
        item.style.order = null;
        item.style.display = null;
      });
    };

    var showPopularPhotos = function() {
      restoreDefaults();
      toggleBtn(filterBtns.popularBtn);
    };

    var haveDoubles = function(array) {
      var changes = false;
      array.forEach(function(item, i, thatArray) {
        var tmpIndex = thatArray.indexOf(item, i + 1);
        if (tmpIndex && tmpIndex !== -1) {
          thatArray[tmpIndex] = randMinMax(0, 24);
          changes = true;
        }
      });
      return changes;
    };

    var showNewPhotos = function() {
      var newArray = [];
      restoreDefaults();
      for (var i = 0; i < 15; i++) {
        newArray[i] = randMinMax(0, 24);
      }
      while (haveDoubles(newArray)) {
        haveDoubles(newArray);
      }
      newArray.forEach(function(item) {
        pictures[item].style.display = 'none';
      });
      toggleBtn(filterBtns.newBtn);
    };

    var onDiscussedBtnKeydown = function(evt) {
      if (window.isEnter(evt)) {
        showDiscussedPhotos();
      }
    };
    var onNewBtnKeydown = function(evt) {
      if (window.isEnter(evt)) {
        showNewPhotos();
      }
    };
    var onPopularBtnKeydown = function(evt) {
      if (window.isEnter(evt)) {
        showPopularPhotos();
      }
    };

    var onDiscussedBtnClick = function(evt) {
      showDiscussedPhotos();
    };
    var onNewBtnClick = function(evt) {
      showNewPhotos();
    };
    var onPopularBtnClick = function(evt) {
      showPopularPhotos();
    };

    imgFilters.style.opacity = '1';

    filterBtns.discussedBtn.addEventListener('click', onDiscussedBtnClick);
    filterBtns.newBtn.addEventListener('click', onNewBtnClick);
    filterBtns.popularBtn.addEventListener('click', onPopularBtnClick);

    filterBtns.discussedBtn.addEventListener('keydown', onDiscussedBtnKeydown);
    filterBtns.newBtn.addEventListener('keydown', onNewBtnKeydown);
    filterBtns.popularBtn.addEventListener('keydown', onPopularBtnKeydown);
  };
}());
