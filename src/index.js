let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container")
  const toyForm = document.querySelector("form.add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function fetchToys(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => {
      toys.forEach(toy => createToy(toy))
    })
  }

  function createToy(toy){
    const div = document.createElement("div")
    div.className = "card"

    const h2 = document.createElement("h2")
    h2.innerText = toy.name

    const img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"

    const p = document.createElement("p")
    p.innerText = toy.likes + " Likes" 

    const btn = document.createElement("button")
    btn.className = "like-btn"
    btn.innerText = "Like"

    btn.addEventListener("click", () => {
      fetch("http://localhost:3000/toys/"+toy.id,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes + 1 
        })
      })
      .then(res => res.json())
      .then(updatedToy => {
        p.innerText = updatedToy.likes + " Likes"
        toy = updatedToy
      })
    })

    div.append(h2, img, p, btn)
    const collection = document.querySelector("div#toy-collection")
    collection.append(div)

  }

  fetchToys()

  toyForm.addEventListener("submit", () => {
    event.preventDefault()

    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": event.target[0].value,
        "image": event.target[1].value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(newToy => {
      appendToy(newToy)
      toyForm.reset()
      addToy = !addToy
    })

  })


});
