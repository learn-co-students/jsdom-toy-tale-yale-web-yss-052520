let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("div#toy-collection")
  // const toyForm = document.querySelector('form.add-toy-form')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {    
        event.target.reset()  
        event.preventDefault()
        toyForm.style.display = "none";
        postToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
    
  })


  function fetchToys(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => toys.forEach(toy => appendToy(toy)))
  }


  function postToy(evt_target) {
    const configObj = {
      method: "POST" ,
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": evt_target.name.value,
        "image": evt_target.image.value,
        "likes": 0
      })
    }

      fetch('http://localhost:3000/toys', configObj)
      .then(res => res.json())
      .then(newToy => appendToy(newToy))
  }



  function appendToy(toy){
    const card = ce('div')
    card.className = 'card'

    const h2 = ce('h2')
    h2.innerText = toy.name

    const img = ce('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = ce('p')
    p.innerText = `${toy.likes} likes`

    const btn = ce('btn')
    btn.className = 'like-btn'
    btn.innerText = 'like <3'

    btn.addEventListener('click', () => {
      let configObj = {
        method: "PATCH" ,
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": ++toy.likes
        })
      }

      fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(p.innerText = `${+toy.likes} likes`)
    })

    card.append(h2, img, p, btn)
    toyCollection.append(card)
  }



  function ce(element){
    return document.createElement(element)
  }


  fetchToys()
})