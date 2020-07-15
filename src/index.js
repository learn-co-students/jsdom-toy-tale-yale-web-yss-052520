let addToy = false;

const toyFormContainer = document.querySelector(".container");
const addBtn = document.querySelector("#new-toy-btn");

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
})

function qs(element) {
  return document.querySelector(element)
}

function ce(element) {
  return document.createElement(element)
}

let toyDiv = qs("div#toy-collection")
let toyForm = qs("form.add-toy-form")

fetch("http://localhost:3000/toys")
.then( res => res.json() )
.then( toys => displayToys(toys))

function displayToys(toys) {
  toys.forEach(toy => {
    displayToy(toy)
  })
}

function displayToy(toy) {
  let toyCard = ce("div")
  toyCard.className = "card"

  let h2 = ce("h2")
  h2.innerText = toy.name

  let img = ce("img")
  img.className = "toy-avatar"
  img.src = toy.image

  let p = ce("p")
  p.innerText = toy.likes

  let likeBtn = ce("button")
  likeBtn.className = "like-btn"
  likeBtn.innerText = "Like <3"
  likeBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": ++toy.likes
      })
    })
    .then(res => res.json())
    .then( updatedToy => {
      toy = updatedToy
      p.innerText = toy.likes
    })
  })

  let deleteBtn = ce("button")
  deleteBtn.className = "delete-btn"
  deleteBtn.innerText = "delete :("
  deleteBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE",
    })
    .then(res => toyCard.remove())
  })

  toyCard.append(h2, img, p, likeBtn, deleteBtn)
  toyDiv.append(toyCard)
}

toyForm.addEventListener("submit", () => {
  event.preventDefault()
  let submitName = event.target[0].value
  let submitUrl = event.target[1].value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": submitName,
      "image": submitUrl,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then( newToy => {
    displayToy(newToy)
    toyForm.reset()
  })
})