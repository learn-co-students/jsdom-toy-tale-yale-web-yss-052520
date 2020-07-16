let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCard = document.querySelector("div#toy-collection")
  const toyForm = document.querySelector("form.add-toy-form")

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  function ce(element) {
    return document.createElement(element)
  }

  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => showToys(toys))
  }

  function showToys(toys) {
    toys.forEach(toy => appendToy(toy))
  }

  function appendToy(toy) {

    // <div class="card">
    //   <h2>Woody</h2>
    //   <img src=toy_image_url class="toy-avatar" />
    //   <p>4 Likes </p>
    //   <button class="like-btn">Like <3</button>
    // </div>

    const div = ce("div")
    div.className = "card"

    const h2 = ce("h2")
    h2.innerText = toy.name

    const img = ce("img")
    img.src = toy.image
    img.className = "toy-avatar"

    const p = ce("p")
    p.innerText = toy.likes + " Likes"

    const button = ce("button")
    button.className = "like-btn"
    button.innerText = "Like <3"

    button.addEventListener("click", () =>{
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "likes": ++toy.likes
        })
      })
      .then(response => response.json())
      .then(updatedToy => {
        p.innerText = updatedToy.likes + " Likes"
        toy = updatedToy
      })
    })

    div.append(h2, img, p, button)

    toyCard.appendChild(div)

  }

  fetchToys()

  toyForm.addEventListener("submit", () => {
    event.preventDefault()

    let name = event.target[0].value.trim()
    let url = event.target[0].value.trim()

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": url,
        "likes": 0
      })
    })
      .then(response => response.json())
      .then(newToy => {
        appendToy(newToy)
        toyForm.reset()
        toyFormContainer.style.display = "none"
        addToy = !addToy
      })

  })

})
