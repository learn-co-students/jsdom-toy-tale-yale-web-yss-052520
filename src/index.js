let addToy = false;
let url = "http://localhost:3000/toys"

function ce(name){
  return document.createElement(name)
}

function getToys(){
  fetch(url)
  .then(res => res.json())
  .then(toys => showToys(toys))
  .catch(error => console.log(error))
}

function showToys(toys){
  toys.forEach(toy => {
    buildToy(toy)
  })
}

function buildToy(toy){
  const collection = document.querySelector("#toy-collection")
  let newCard = ce("div")
  newCard.classList.add("card")

  let h2 = ce("h2")
  h2.innerText = toy.name

  let img = ce("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  let likeCount = ce("p")
  likeCount.innerText = toy.likes + " Like(s)"

  let likeButton = ce("button")
  likeButton.classList.add("like-btn")
  likeButton.innerText = "Like"

  likeButton.addEventListener("click", (event) => {
    event.preventDefault()

    let configObj = likeConfigObj(toy)

    fetch(url+"/"+toy.id, configObj)
    .then(response => response.json())
    .then(newToy => {
      toy = newToy
      likeCount.innerText = newToy.likes + " Like(s)"
    })
  })

  newCard.append(h2, img, likeCount, likeButton)

  collection.appendChild(newCard)
}

function newConfigObj(){
  let newName = document.querySelector("input#input-name").value
  let newImage = document.querySelector("input#input-image").value

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  }
}

function likeConfigObj(toy){
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    let configObj = newConfigObj()

    fetch(url, configObj)
    .then(response => response.json())
    .then(newToy => {
      buildToy(newToy)
      toyForm.reset()
    })
  })

  getToys()
});