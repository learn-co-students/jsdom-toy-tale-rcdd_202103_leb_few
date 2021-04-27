let addToy = false;
let mDiv;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
 
  ft();
  
});
function ft(){
    fetch("http://localhost:3000/toys")
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      console.log(json);
      //displayDiv(json);
    });
}
function displayDiv(json) {
  mDiv=document.getElementById("toy-collection");
  console.log(json.data.length);
  for (let i = 0; i < json.data.length; i++) {
    imagesDiv.innerHTML += `
    <img src=${json.data[i].images.original.url}/>
    `;
  }
}
  






