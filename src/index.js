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

  getToys()
  newToy()
});


function getToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => showToys(toys))
  .catch(error => console.log(error))
}

function showToys(toys){
  toys.forEach(toy => {
      showToy(toy)
  })
}

function showToy(toy){
  const div = document.createElement("div")
  div.className = "card"

  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  const img = document.createElement("img")
  img.className = "toy-avatar"
  img.src = toy.image

  const p = document.createElement("p")
  p.innerText = toy.likes + " Likes"

  const btn = document.createElement("button")
  btn.className = "like-btn"
  btn.innerText = "Like <3"

  btn.addEventListener("click", async () => {
    toy = await addLikes(toy)
    p.innerText = toy.likes + " Likes"
  })

  const toyCollection = document.querySelector("div#toy-collection")
  div.append(h2,img,p,btn)
  toyCollection.append(div)
}

  async function addLikes(toy){
    const response = await fetch("http://localhost:3000/toys/"+toy.id,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1 // ++toy.likes
      })
    })
    const updatedToy = await response.json()
    return updatedToy
  }

function newToy(){
  toyForm = document.querySelector("form")
  const toyFormContainer = document.querySelector(".container");
  toyForm.addEventListener("submit", () => {
    event.preventDefault()
    //  debugger

    let name = event.target[0].value
    let url = event.target[1].value

    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name, //name: name => name
        "image": url,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(newToy => {
      showToy(newToy)
      toyForm.reset()
      toyFormContainer.style.display = "none"
      addToy = !addToy
    })
  })
}
