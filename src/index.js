let addToy = false;
let divCollect = document.querySelector('#toy-collection');


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

//to get all the toys fetching
function getToys(){
 return fetch("http://localhost:3000/toys")
  .then(res => res.json())
}
getToys().then(toys =>{toys.forEach(toy =>{renderToys(toy)})});










function renderToys(toy) {
  let divCard=document.createElement("div");
  div.add.classList="card";
  let h2=document.createElement('h2');
  h2.innertext=toy.name;
  let img=document.createElement("img");
  img.src=toy.img;
  img.add.classList="toy-avatar";
  let p=document.createElement("p");
  p.innertext="${toys.likes} likes";
  let btn=document.createElement("button");
  btn.add.classList('like-button');
  btn.innertext="Like";
  btn.addEventListener('click',(e)=>{
    console.log(e.target.dataset);
     likes(e)
  })
  divCard.append(h2,img,p,btn);
  divCollect.append(divCard);
}
//post a new toy
function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      renderToys(obj_toy)
    })
}
//update the likes
function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}








