let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toy-collection = document.getElementById('toy-collection');
  const form = document.querySelector(".add-toy-form");
  const option ={
    method :"POST",
    headers:
    {
    "Content-Type": "application/json",
    Accept: "application/json"
    }

    body: JSON.stringify({
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
    })
  };
const op = {
  method:"PATCH",
  headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "likes": ++(json.likes)
})
}

form.addEventListener("submit" , ()=>{
  fetch("http://localhost:3000/toys" , option)
  .then(response => response.json())
  .then(json =>{
    toy-collection.insertAdjacentHTML("beforeend",`<div class='card'><h2>${json.name}</h2><img src=${json.image} class='toy-avatar' /><p>${json.likes} Likes </p><button class='like-btn'>Like <3</button> </div>`)
  });
})

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json =>{
    toy-collection.insertAdjacentHTML("beforeend",`<div class='card'><h2>${json.name}</h2><img src=${json.image} class='toy-avatar' /><p>${json.likes} Likes </p><button class='like-btn'>Like <3</button> </div>`)
    fetch("http://localhost:3000/toys" , op)
  });


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
