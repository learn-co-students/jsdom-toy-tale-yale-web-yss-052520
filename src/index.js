// fetch Andy's toys
fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(toys => showToys(toys))

function showToys(toys){
toys.forEach(toy => {
  displayToy(toy)
})
}

// add toy info to the card
function displayToy(toy){

  const divCard = document.createElement("div")
  divCard.className = "card"

  const h2Tag = document.createElement("h2")
  h2Tag.innerText = toy.name  

  const imgTag = document.createElement("img")
  imgTag.className = "toy-avatar"
  imgTag.src = toy.image

  const pTag = document.createElement("p")
  pTag.innerText = `${toy.likes} Likes`

  const btnTag = document.createElement("button")
  btnTag.className = "like-btn"
  btnTag.innerText = "Like <3"

  divCard.append(h2Tag, imgTag, pTag, btnTag)
  document.querySelector("div#toy-collection").append(divCard)

  btnTag.addEventListener("click", ()=>{
    let configObj= {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1 
      })
    }
    
    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(res => res.json())
      .then(toy=>{
        pTag.innerText = `${toy.likes} Likes`
      })
  })
}

// add a new toy
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"

      const toyForm = document.querySelector("form.add-toy-form")

      toyForm.addEventListener("submit", () => {
        event.preventDefault()
        const name = event.target[0].value  
        const image = event.target[1].value 
        
        let configObj= {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
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
            displayToy(toy)
            toyForm.reset()
          })
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

