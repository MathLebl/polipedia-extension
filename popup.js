function listenClick() {
  const button = document.getElementById('get-name');
  button.addEventListener('click', getText);

  function getText(){
    let selectedText = window.getSelection();
    selectedText.toString;
    console.log(selectedText)
  };
}


//     () => {
//     chrome.tabs.executeScript({
//       file: 'scripts/get-name.js'
//     });
//   })
// }

