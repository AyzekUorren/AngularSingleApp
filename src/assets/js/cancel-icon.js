(function () {
  var search = document.getElementsByClassName('search')[0];
  var searchField = search.querySelector('input');
  var elementCancel = search.querySelector('img');
  positionInsideElementX(searchField, elementCancel, -30);
  window.addEventListener("resize", function () {
    positionInsideElementX(searchField, elementCancel, -30);
  });
  searchField.addEventListener('input', function () {
    elementCancel.style.display = 'block';
  });
  elementCancel.addEventListener('click', function () {
    searchField.value = '';
    elementCancel.style.display = 'none';
  });

}());

function positionInsideElementX(insideElement, Element, length){
  var offestsInsideElement = insideElement.getBoundingClientRect();
  var positionLeft = offestsInsideElement.left + offestsInsideElement.width + length;
  var positionTop = offestsInsideElement.bottom - 32;

  Element.style.position = "absolute";
  Element.style.left = positionLeft + 'px';
  Element.style.top = positionTop + 'px';
}
