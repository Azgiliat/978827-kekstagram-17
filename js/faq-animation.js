var cotentHeight = document.querySelector('.bottom-content').offsetHeight;
var openCloseBtn = document.querySelector('.toggle-content');
var content = document.querySelector('.bottom-content');

content.style.height = '200px';
content.classList.add('toggled');
endHeight = 200;

var animateHeight = function (elem, direction) {
  var calculateHeight = function (elem) {
    var nodes = elem.childNodes;
    var realHeight = 0;
    nodes.forEach(function (item) {
      if (item.nodeType == 1)
        realHeight += item.offsetHeight;
    });
    return realHeight;
  };
  var realHeight = calculateHeight(elem);
  var startHeight = elem.offsetHeight;
  var moveHeightUp = function () {
    startHeight++;
    elem.style.height = startHeight + 'px';
    if (startHeight === realHeight) {
      clearInterval(id);
    }
  };
  var moveHeightDown = function () {
    startHeight--;
    elem.style.height = startHeight + 'px';
    if (startHeight === endHeight) {
      clearInterval(id);
    }
  };
  if (direction) {
    var id = setInterval(moveHeightUp, 20);
  } else {
    var id = setInterval(moveHeightDown, 20);
  }
}

openCloseBtn.addEventListener('click', function () {
  if (content.classList.contains('toggled')) {
    animateHeight(content, true);
  } else {
    animateHeight(content, false);
  }
  content.classList.toggle('toggled');
});
