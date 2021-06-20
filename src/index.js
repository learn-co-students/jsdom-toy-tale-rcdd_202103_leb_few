let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let toyCollection=document.getElementById("toy-collection");
let name=document.getElementById("name");
let image=document.getElementById("image");
let createToy=document.getElementById("createToy");
let likeButtons=document.getElementsByClassName("like-btn");



  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
});

//Challenge 1
document.addEventListener("DOMContentLoaded",fetchToys());

function fetchToys(){
fetch ("http://localhost:3000/toys")
.then (function (response){
  return response.json();
})
.then (function (json){
  displayToys(json);
})
}

function displayToys(json){

  for(let i=0;i<json.length;i++)
{
  toyCollection.innerHTML+=`<div class='card'>
  <h2>${json[i].name}</h2>
  <img src="${json[i].image}" class="toy-avatar" />
  <p>${json[i].likes} </p>
  <button id="toy${json[i].id}" class="like-btn">Like <3</button>
  </div>`
  let likes=document.querySelector(`#toy${json[i].id}`);
  console.log(likes)
  likes.addEventListener("click", ()=>{
    console.log("i am the event listener")
    increment(json[i]);
    console.log("i am the event listener")
})

}
}

//POST
function displayNewToys(json){
  toyCollection.innerHTML+=`<div class='card'>
  <h2>${json.name}</h2>
  <img src="${json.image}" class="toy-avatar" />
  <p>${json.likes} </p>
  <button class="like-btn">Like <3</button>
  </div>`

}
createToy.addEventListener("click",addToys);

function addToys(e){
  e.preventDefault();
const formData = {
  "name": name.value,
  "image": image.value,
  "likes": 0
};

const configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};

fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    displayNewToys(json);
  })
}

//challenge 3


function increment(toy){
console.log("increment")
  const updatedCongfigObj={
    method: "PATCH",
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    body: JSON.stringify({
          "likes": parseInt(toy.likes)++
    })
  }
  fetch(`http://localhost:3000/toys/${toy.id}`,updatedCongfigObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
  })
  .catch((e)=> console.log(e));

}
