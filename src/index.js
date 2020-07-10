let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const div = document.querySelector("div#toy-collection")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Helper Function for Problem 1:
  function createToy(toy) {
    const card = document.createElement("div")
    card.className = "card"

    const name = document.createElement("h2")
    const image = document.createElement("img")
    const likes = document.createElement("p")
    const btn = document.createElement("button")
    
    btn.className = "like-btn"
    btn.innerText = "Like <3"

    //Problem 3: Add the event listener upon its creation 
    //Key: you can add event listeners when you create the button!!
    btn.addEventListener("click", () => {
      //Adjusting the Number on the Screen
      const pTag = event.target.parentNode.querySelector("p") 
      const newLikes = parseInt(pTag.innerText[0]) + 1
      pTag.innerText = `${newLikes} Likes`

      //Now we need to send a patch request to the server to update backend
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
    })


    name.innerText = toy.name 
    image.src = toy.image 
    image.className = "toy-avatar"
    likes.innerText = toy.likes + " Likes "
    
    card.append(name, image, likes, btn)
    div.append(card)
  }

  // Problem 1: Fetch Andy's Toys with GET request
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(function(toys) {
    toys.forEach(toy => createToy(toy))
  })

  //Problem 2: Add a new Toy with POST request
  const form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", function() {
    event.preventDefault()
    
    const name = event.target[0].value
    const image = event.target[1].value 

    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name, 
        image, 
        likes: 0 
      })
    })
    .then(response => response.json())
    .then(obj => createToy(obj))

    form.reset()
  })
});
