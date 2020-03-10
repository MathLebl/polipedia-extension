function readDocumentText() {
  const docText = document.querySelector('body').text;
}

function formatName(name) {
  var separatedName = name.split(' ');
  var formatted = separatedName.map(function(nameParticle) {
    var newNameParticle = nameParticle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return newNameParticle;
  });
  return formatted.join('-');
}

function modalInteraction() {
  // Get the modal
  var modal = document.getElementById("polipediaModal");

  // Get the <span> element that closes the modal
  var span = document.getElementById("closePolipediaModal");

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function getSelectText() {
  var selectedText = window.getSelection().toString();
  var formattedName = formatName(selectedText);
  var apiUrl = `http://localhost:3000/api/v1/politicians/${formattedName}`;
  var response = fetch(apiUrl)
  .then(response => response.json())
  .then((data) => {
    return data
  });
  return response
}


async function insertModal() {
  let apiData = await getSelectText();
  console.log(apiData);
  var body = document.querySelector('body')
  var modalStyle = `<style>

  .modal-container {
    z-index: 1;
    position: fixed;
    background-color: rgba(0,0,0,0.4);
    left: 0;
    top: 0;
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    min-height: 50vh;
    text-align: center;
  }

  #closePolipediaModal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  #closePolipediaModal:hover, #closePolipediaModal:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>`

  body.insertAdjacentHTML('afterbegin',
    `${modalStyle}
    <div id="polipediaModal" class="modal-container">
    <div class="modal-content">
    <span id="closePolipediaModal">&times;</span>
    <img src="${apiData.photo}" height="100">
    <h1>${apiData.name}</h1>
    <h2>${apiData.group}</h2>
    <p>Profession: ${apiData.profession}</p>
    </div>
    </div>
    `)
  modalInteraction();
}

insertModal();
