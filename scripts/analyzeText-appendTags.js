console.log('reading file')

// get Names List from API
function getPoliticiansName() {
  // getting names list
  var namesApiUrl = 'https://www.polipedia.fr/api/v1/politicians/';
  var response = fetch(namesApiUrl)
  .then(response => response.json())
  .then((data) => {
    return data
  });
  return response
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// Analyze document text and compare it with names list in DB through API
async function readAnalyzeDocumentText() {
  var docText = document.querySelector('body').innerHTML;
  var normalizedDocText = docText.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  var politiciansNames = await getPoliticiansName();
  // turning names list into normalized array of names
  var namesArray = politiciansNames.map(function(hash) {
    return {
      normalName: hash.name,
      formattedName: hash.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}
    });
  var namesInDoc = [];
  namesArray.forEach(function(hash) {
    if(normalizedDocText.includes(hash['formattedName'])) {
      namesInDoc.push(hash['normalName']);
    }
  })
  var styleTags = `<style>
  .polipediaName {
    background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(49,39,130, 0.2) 50%);
  }

  .polipediaName:hover {
    background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(49,39,130, 0.3) 50%);
    cursor: help;
  }
  </style>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', styleTags);
  namesInDoc.forEach(function(name) {
    regex = new RegExp(name, "g");
    var nameWithTags = `<span class="polipediaName" title="Découvrir sur Polipedia">${name}</span>`
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(regex, nameWithTags);
  })
}

readAnalyzeDocumentText();
console.log('Done')

// Functions below are supposed to implement 'tippy.js' to create a tooltip around the politician names - need to implement it with webpack

// function addTippyCDN() {
//   var tags = `<script src="https://unpkg.com/@popperjs/core@2"></script>
//               <script src="https://unpkg.com/tippy.js@6"></script>`
//   document.querySelector('body').insertAdjacentHTML('beforeend', tags)
// }

// addTippyCDN();

// function addTippy() {
//   tippy('.polipediaName', {
//     content: 'Analyze with Polipedia'
//   })
// }

// addTippy();


