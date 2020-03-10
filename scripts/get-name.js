// turn name to slug
function formatName(name) {
  var separatedName = name.split(' ');
  var formatted = separatedName.map(function(nameParticle) {
    var newNameParticle = nameParticle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return newNameParticle;
  });
  return formatted.join('-');
}

// add interactivity to modal (close it with x button)
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
  // getting user selection and trimming whitespace
  var selectedText = window.getSelection().toString().trim();
  // formatting selection
  var formattedName = formatName(selectedText);
  //feching api response
  var apiUrl = `http://localhost:3000/api/v1/politicians/${formattedName}`;
  var response = fetch(apiUrl)
  .then(response => response.json())
  .then((data) => {
    return data
  });
  return response
}


async function insertModal() {
  // awaiting api reponse
  var apiData = await getSelectText();
  var userSelection = window.getSelection().toString().trim();
  var daysSinceBeginning = (Date.now() - Date.parse(apiData.mandate_begin_date)) / (1000*60*60*24);
  var body = document.querySelector('body');
  var modalStyle = `<style>

  .modal-container {
    z-index: 50;
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
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    min-height: 30vh;
    text-align: center;
    border-radius: 20px;
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

  #polipediaLink {
    transition: transform 0.3s ease;
  }

  #polipediaLink:hover {
    transform: scale(2);
  }
  </style>`

  // inserting modal in HTML
  if (userSelection === "") {
    console.log('Empty selection!')
  } else {
    body.insertAdjacentHTML('afterbegin',
      `${modalStyle}
      <div id="polipediaModal" class="modal-container">
      <div class="modal-content">
      <span id="closePolipediaModal">&times;</span>
      <img src="${apiData.photo}" height="100">
      <h1>${apiData.name}</h1>
      <h2>${apiData.group}</h2>
      <p>Profession: ${apiData.profession}</p>
      <p>a voté ${apiData.votes} fois depuis le ${apiData.mandate_begin_date} (soit ${Math.round((apiData.votes / daysSinceBeginning) * 100) / 100 } votes/jour)</p>
      <a href="http://localhost:3000${apiData.polipedia_link}" id="polipediaLink">See on Polipedia</a>
      </div>
      </div>`);
    modalInteraction();}
  }

insertModal();
