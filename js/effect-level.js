'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload__overlay');
  var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
  var effectLevelLine = imgUpload.querySelector('.effect-level__line');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
  var effectLevelValue = imgUpload.querySelector('.effect-level__value');

  var effectLevelCalculate = function (levelPin, levelLine, shift) {
    var pinCoords = levelPin.getBoundingClientRect();
    var lineCoords = levelLine.getBoundingClientRect();
    return Math.round(((pinCoords.left + (pinCoords.right - pinCoords.left) / 2) - shift - lineCoords.left) / levelLine.offsetWidth * 100);
  };

  var coordsLimits = {
    maxX: effectLevelLine.getBoundingClientRect().left + effectLevelLine.offsetWidth,
    minX: effectLevelLine.getBoundingClientRect().left
  };
  effectLevelPin.addEventListener('mousedown', function (e) {
    var onMouseUp = function () {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
    var onMouseMove = function (evt) {
      var effectLevelSet = function (inRange) {
        var configs = {
          maxConfigs: {
            left: '100%',
            width: '100%',
            value: 100,
            startCoords: coordsLimits.maxX
          },
          minConfigs: {
            left: '0%',
            width: '0%',
            value: 0,
            startCoords: coordsLimits.minX
          },
          inRangeConfigs: {
            left: effectLevelCalculate(effectLevelPin, effectLevelLine, shift) + '%',
            width: effectLevelCalculate(effectLevelPin, effectLevelLine, shift) + '%',
            value: effectLevelCalculate(effectLevelPin, effectLevelLine, shift),
            startCoords: evt.clientX
          }
        };

        var isInRange = function (i) {
          effectLevelPin.style.left = i.left;
          effectLevelDepth.style.width = i.width;
          effectLevelValue.value = i.value;
          startCoords = i.startCoords;
          effectLevelValue.dispatchEvent(onFilterLvlChange);
        };

        switch (inRange) {
          case 0:
            isInRange(configs.inRangeConfigs);
            return;
          case 1:
            isInRange(configs.maxConfigs);
            return;
          case -1:
            isInRange(configs.minConfigs);
            return;
        }
      };

      var shift = startCoords - evt.clientX;
      startCoords = evt.clientX;
      if (effectLevelCalculate(effectLevelPin, effectLevelLine, shift) > 100) {
        effectLevelSet(1);
      }
      if (effectLevelCalculate(effectLevelPin, effectLevelLine, shift) < 0) {
        effectLevelSet(-1);
      } else {
        effectLevelSet(0);
      }
    };
    var startCoords = e.clientX;
    var filterLvlChangeConfig = {
      bubbles: true,
      cancelable: false
    };
    var onFilterLvlChange = new Event('filterLvlChange', filterLvlChangeConfig);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
