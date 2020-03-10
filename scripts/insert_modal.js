var getSelectText = require('./get-name.js');

console.log(getSelectText());
getSelectText();

function insertModal() {
  var body = document.querySelector('body')
  var modal = load( "../modal.html" );

  body.insertAdjacentElement('afterbegin', modal)
}

