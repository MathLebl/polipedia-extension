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
  namesInDoc.forEach(function(name) {
    regex = new RegExp(name, "g");
    var styleTags = `<style>
    .polipediaName {
      background-color: yellow;
    }
    </style>`
    var nameWithTags = `<span class="polipediaName">${name}</span>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', styleTags);
    document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(regex, nameWithTags);
  })
}

readAnalyzeDocumentText();

console.log('Done')
