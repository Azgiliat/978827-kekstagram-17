'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.donwloadedPictures = [];

  xhr.open('GET', URL);
  xhr.send();
})();
