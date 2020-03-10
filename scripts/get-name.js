function getSelectText() {
  // let selectedText = alert(window.getSelection().toString());
  // console.log("selectedText");
  fetch("http://localhost:3000/api/v1/politicians/21")
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    alert(data.name)
    // data.Search.forEach((result) => {
    //   // const movie = `<li class="list-inline-item">
    //   //   <img src="${result.Poster}" alt="">
    //   //   <p>${result.Title}</p>
    //   // </li>`;
    //   // results.insertAdjacentHTML("beforeend", movie);
    //   var name = result.name
    //   console.log(name)
    // });
  });
}
// document.querySelector('body').style.backgroundColor="red";
// alert('fjdsklfds')
getSelectText();
