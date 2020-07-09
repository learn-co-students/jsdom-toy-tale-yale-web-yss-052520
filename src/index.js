// helper methods
function qs(selector){
  return document.querySelector(selector)
 }
 
 function ce(element){
   return document.createElement(element)
 }

// given code (begin)
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = qs("#new-toy-btn");
  const toyFormContainer = qs(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // give code (end)

  // must be inside DomContentLoaded otherwise throws null error bc script tag?
  const toyForm = qs("form.add-toy-form")
  toyForm.addEventListener("submit", () => {
    event.preventDefault()

    const name = event.target[0].value  
    const image = event.target[1].value 
    
    let configObj= {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        image,
        likes: 0
      })
    }
    
    fetch("http://localhost:3000/toys", configObj)
      .then(res => res.json())
      .then(toy => {
        showToy(toy)
        toyForm.reset()
      })
  });
});

// grab toys from server
fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(toys => showToys(toys))

// show toys
function showToys(toys){
  toys.forEach(toy => {
    showToy(toy)
  })
}

// take toy info from fetch and make card
function showToy(toy){

  // create html elements
  const divCard = ce('div')
  const h2 = ce('h2')
  const img = ce('img')
  const p = ce('p')
  const btn = ce('button')

  // give elements attributes
  divCard.className = 'card'
  h2.innerText = toy.name  
  img.className = 'toy-avatar'
  img.src = toy.image
  p.innerText = `${toy.likes} Likes`
  btn.className = 'like-btn'
  btn.innerText = 'Like <3'

  // append card to screen
  divCard.append(h2, img, p, btn)
  qs('div#toy-collection').append(divCard)

  // add like functionality to screen/card
  btn.addEventListener('click', ()=>{
    let configObj= {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes + 1 
      })
    }
    
    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(res => res.json())
      .then(toy=>{
        p.innerText = `${toy.likes} Likes`
    })
  })
}