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

  const toyForm = document.querySelector('form.add-toy-form')

  toyForm.addEventListener('submit', () => {
    event.preventDefault()
    const newName = document.querySelector('input#input-name').value
    const newPic = document.querySelector('input#input-img').value 
    let configObj = {
      method: "POST", 
      headers: { 
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        image: newPic,
        likes: 0 
      })
    }
    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json()) 
    .then(json => newToy(json)) 

    toyForm.reset()
  })

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(function(json){
    json.forEach(toy => {
      newToy(toy)  
    })
  })


});


function newToy(toy){
  const toyCollection = document.querySelector('div#toy-collection')
  const card = document.createElement('div')
  card.className = "card" 
  card.id = toy.id
  
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name 
  card.appendChild(toyName)

  const toyPic = document.createElement('img')
  toyPic.src = toy.image 
  toyPic.className = "toy-avatar"
  card.appendChild(toyPic)

  const toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes 
  card.appendChild(toyLikes) 

  const toyButton = document.createElement('button')
  toyButton.innerText = "like <3" 
  toyButton.className = "like-btn"
  card.appendChild(toyButton)

  // toyButton.addEventListener('click', () => {
  //   newLikes = toy.likes + 1 
  //   fetch(`http://localhost:3000/toys/${toy.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       likes: newLikes 
  //     }) 
  //   }) 
  //   .then(res => res.json())
  //   .then (toy => {
  //     toyLikes.innerText = newLikes 
  //   })
  //   .then(() => console.log(newLikes))
  // }) 
  toyCollection.prepend(card) 
  likeButtonListener(card) 
}

function likeButtonListener(card){
    const likeButton = card.querySelector('button.like-btn')

    likeButton.addEventListener('click', () => {

      const targetToyId = card.id  
      let nowLikes = card.querySelector('p').innerText
      let newLikes = parseInt(nowLikes) + 1 

      fetch(`http://localhost:3000/toys/${targetToyId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikes 
        }) 
      }) 
      .then(res => res.json())
      .then (toy => {
        card.querySelector('p').innerText = newLikes 
      }) 
      .then(() => console.log(newLikes))
    }) 
}