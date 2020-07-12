let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDiv = document.querySelector("div#toy-collection")
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

  function ce(element) {
    return document.createElement(element)
  }

  function fetchToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => showToys(toys))
  }

  function showToys(toys) {
    toys.forEach(toy => createToy(toy))
  }

  function createToy(toy){
    const div = ce("div")
    div.className = "card"

    const h2 = ce("h2")
    h2.innerText = toy.name

    const img = ce("img")
    img.src = toy.image
    img.className = "toy-avatar"

    const p = ce("p")
    p.innerText = toy.likes + " Likes"

    const btn = ce("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"

    btn.addEventListener("click", () => {      
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "likes": toy.likes + 1
        })
      }

      fetch('http://localhost:3000/toys/' + toy.id, configObj)
      .then(res => res.json())
      .then(updatedToy => {
        toy = updatedToy
        p.innerText = toy.likes + " Likes"
      })
    })

    div.append(h2, img, p, btn)

    toyDiv.append(div)
  }

  fetchToys()

  toyForm.addEventListener("submit", () => {
    event.preventDefault()
  
    let name = event.target[0].value
    let url = event.target[1].value

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": url,
        "likes": 0
      })
    }

    fetch('http://localhost:3000/toys', configObj)
    .then(res => res.json())
    .then(newToy => {
      createToy(newToy)
      toyForm.reset()
      toyFormContainer.style.display = "none"
      addToy = !addToy
    })


    
  })


});
