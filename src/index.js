let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const form = document.querySelector(".add-toy-form");
  const inputs = document.getElementsByClassName('input-text');
  let array = [];
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener('submit', addToy);


  function addToy(e){
    const formData = {
            "name": inputs[0].value,
            "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
            "likes": 0
          };
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    };
    e.preventDefault();
    fetch("http://localhost:3000/toys", configurationObject)
    .then(function(response) {
    return response.json();
    })
    .then(function(object) {
      array.push(object);
      displayToy(array);
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
  });
  }
  fetch("http://localhost:3000/toys")
  .then((resp)=> {
    return resp.json();
  })
  .then((data)=>{
    // console.log(data);
    array = data;
    displayToy(data);
  })
  .catch((error)=>{
    console.log(error.message);
  })

  const displayToy = (toys) => {
    toyCollection.innerHTML = "";
    toys.forEach(toy => {renderToys(toy)  })
  }
  function renderToys(toy) {
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"
    btn.addEventListener('click', (e) => { handleLike(e)  })

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)

    toyCollection.append(divCard)
  }

  const handleLike = (e)=> {
    let id = parseInt(e.target.id);
    array[id - 1].likes += 1;
    let likeNum = array[id - 1].likes;
    let click = e.target.parentElement.querySelector('p');
    const formData = {
            "likes": likeNum
          };

    const configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:3000/toys/${id}`, configurationObject)
    .then(function(response) {
    return response.json();
    })
    .then(function(object) {
      // console.log(object);
      click.innerHTML = `${likeNum} likes`;
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
  });

  }

});
