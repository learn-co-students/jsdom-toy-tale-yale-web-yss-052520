let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const div = qs("div#toy-collection")
  const toyForm = qs("form.add-toy-form")
  // const likeBtn = qs("button.like-btn")


  function ce(element) {
    return document.createElement(element)
  }

  function qs(element) {
    return document.querySelector(element)
  }

  function addNewToy(toy) {
    let toyDiv = ce("div")
    toyDiv.className = "card"

    let h2 = ce("h2")
    h2.innerText = toy.name

    let img = ce("img")
    img.src = toy.image
    img.className = "toy-avatar"

    let p = ce("p")
    p.innerText = `${toy.likes} Likes`

    let btn = ce("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"

    btn.addEventListener("click", () => {
      // debugger
      toy.likes += 1

      fetch("http://localhost:3000/toys/"+toy.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes
        })
      })
      .then( res => res.json())
      .then(json => {
        p.innerText = json.likes
        toy = json
      })
  
  
    })
  

    toyDiv.append(h2, img, p, btn)
    div.appendChild(toyDiv)
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then( res => res.json())
  .then( json => {
    json.forEach(toy => {
      addNewToy(toy)
    })
  })

  toyForm.addEventListener("submit", () => {
    event.preventDefault()
    let name = event.target[0].value
    let image = event.target[1].value

    // debugger
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name,
        image,
        likes: 0 
      })
    })
    .then(res => res.json())
    .then(newToy => addNewToy(newToy))
  })
});
