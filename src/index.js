let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => showToys(toys))
    
});

function showToys(toys) {
  toys.forEach(toy => addToy(toy)))
}

function appendToy(toy) {
  let toyDiv = document.createElement('div')
  toyDiv.className = "card"

  let h2 = document.createElement('h2')
  h2.innerHTML = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  let p = document.createElement('p')
  p.innerHTML = toy.likes

  let btn = document.createElement('btn')
  btn.className = "like-btn"

  toyDiv.append(h2, img, p, btn)

  document.querySelector('div#toy-collection').append(toyDiv)
}

function addNewToy(form) {
  form.addEventListener('submit', () => {
    event.preventDefault()

    let configObj = {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": form[0].value,
        "image": form[1].value,
        "likes": 0
      })
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then(newToy => {
      appendToy(newToy)
      form.reset()
      // toyFormContainer.style.display = "none"
      addToy = !addToy
    })
  })
}
