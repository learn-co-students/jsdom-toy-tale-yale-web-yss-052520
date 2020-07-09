let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toysURL = "http://localhost:3000/toys"
  const toyCollection = qSelector('#toy-collection')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = qSelector('.add-toy-form')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetch(toysURL)
  .then(res => res.json())
  .then(json => createToyCollection(json))
  
  toyForm.addEventListener('submit', () => {
    event.preventDefault()
    
    fetch(toysURL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: toyForm.name.value,
        image: toyForm.image.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(toy => displayToy(toy))
  })
  
  function enableLikes(toy, btn) {
    // let btn = toy.querySelector('.like-btn')
    btn.addEventListener('click', () => {
      // debugger
      fetch(`${toysURL}/${toy.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: toy.likes + 1
        })
      }).then(res => res.json()).then(toy => {
        btn.parentNode.querySelector('p').innerText = toy.likes
      })
      toy.likes = toy.likes + 1
      
    })
  }
  
  function createToyCollection(toys) {
    toys.forEach(toy => {
      displayToy(toy)
    });
  }
  
  function displayToy(toy) {
    let div = cElement('div')
    div.className = 'card'
    
    let h2 = cElement('h2')
    h2.innerText = toy.name
    
    let img = cElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image
    
    let p = cElement('p')
    p.innerText = toy.likes
    
    let btn = cElement('button')
    btn.className = 'like-btn'
    btn.innerText = 'Like'
    enableLikes(toy, btn)
    
    div.append(h2, img, p, btn)
    toyCollection.append(div)
  }
  
  
});

function cElement(element) {
  return document.createElement(element)
}

function qSelector(input) {
  return document.querySelector(input)
}


