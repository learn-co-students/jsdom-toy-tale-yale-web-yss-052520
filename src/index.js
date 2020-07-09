let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const url = "http://localhost:3000/toys"
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const allToys = document.querySelector("#toy-collection");
  const likeButtons = document.querySelectorAll('.like-btn');
  function addToyToPage(toy) {
    const toyDiv = document.createElement('div');
    toyDiv.className = "card";
    const toyName = document.createElement('h2');
    toyName.innerText = toy.name;
    const toyImg = document.createElement('img');
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";
    const numLikes = document.createElement('p');
    numLikes.innerText = toy.likes;
    const btn = document.createElement('button');
    btn.className = "like-btn";
    btn.addEventListener("click", () => {
      const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes++
        })
      }
      fetch(url+'/'+toy.id, configObj)
      .then((response) => {return response.json()})
      .then((json) => {
      numLikes.innerText = json.likes;
    })
  });
    toyDiv.append(toyName, toyImg, numLikes, btn);
    allToys.append(toyDiv);
  }
  fetch(url)
  .then((response) => {return response.json()})
  .then((json) => {
    for (const toy of json) {
      addToyToPage(toy);
    }
  });
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener("submit", () => {
    const inputs = toyFormContainer.querySelectorAll('input');
    event.preventDefault;
    const name = inputs[0].value;
    const image = inputs[1].value;
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name, image, likes: 0 
      })
    }
    debugger
    fetch (url, configObj)
    .then((response) => {
      return response.json()})
    .then((json) => {
      debugger
      addToyToPage(json)
    })
  })
  
})
