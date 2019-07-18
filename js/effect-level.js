'use strict';

(function() {
  var imgUpload = document.querySelector('.img-upload__overlay');
  var effectItems = imgUpload.querySelectorAll('.effects__item .effects__preview');
  var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
  var effectLevelLine = imgUpload.querySelector('.effect-level__line');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
  var effectLevelValue = imgUpload.querySelector('.effect-level__value');

  var effectLevelCalculate = function(levelPin, levelLine, shift) {
    var pinCoords = levelPin.getBoundingClientRect();
    var lineCoords = levelLine.getBoundingClientRect();
    return Math.round(((pinCoords.left + (pinCoords.right - pinCoords.left) / 2) - shift - lineCoords.left) / levelLine.offsetWidth * 100);
  };


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
        startCoords = coordsLimits.maxX;
        effectLevelValue.dispatchEvent(onFilterLvlChange);
      }
      if (effectLevelCalculate(effectLevelPin, effectLevelLine, shift) < 0) {
        effectLevelPin.style.left = '0%';
        effectLevelDepth.style.width = '0%';
        effectLevelValue.value = 0;
        startCoords = coordsLimits.minX;
        effectLevelValue.dispatchEvent(onFilterLvlChange);
      } else {
        effectLevelPin.style.left = effectLevelCalculate(effectLevelPin, effectLevelLine, shift) + '%';
        effectLevelDepth.style.width = effectLevelCalculate(effectLevelPin, effectLevelLine, shift) + '%';
        effectLevelValue.value = effectLevelCalculate(effectLevelPin, effectLevelLine, shift);
        startCoords = evt.clientX;
        effectLevelValue.dispatchEvent(onFilterLvlChange);
      }
    };
    var startCoords = evt.clientX;
    var filterLvlChangeConfig = {
      bubbles: true,
      cancelable: false
    };
    var onFilterLvlChange = new Event('filterLvlChange', filterLvlChangeConfig);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();