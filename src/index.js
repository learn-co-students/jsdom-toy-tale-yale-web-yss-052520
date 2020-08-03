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

  function ce(element){
    return document.createElement(element)
  }

  function fetchToys(){

    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(getToys => showToys(getToys))
  }

  function showToys(toys){
    toys.forEach(toy => appendToy(toy))
  }

  function appendToy(toy){
  //   <div class="card">
    //   <h2>Woody</h2>
    //   <img src=toy_image_url class="toy-avatar" />
    //   <p>4 Likes </p>
    //   <button class="like-btn">Like <3</button>
  // </div>
    const div = ce("div")
    div.className = "card"

    const h2 = ce("h2")
    h2.innerText = toy.name

    const img = ce("img")
    img.src = toy.image
    img.className = "toy-avatar"

    const p = ce("p")
    p.innerText = toy.likes + " Likes" // `${toy.likes} Likes`

    const btn = ce("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"

    // add likes
    btn.addEventListener("click", async () => {
      toy = await addLikes(toy,p)
      p.innerText = toy.likes + " Likes"
    })

    div.append(h2,img,p,btn)

    toyDiv.append(div)

  }

  async function addLikes(toy,p){

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
    // console.log(updatedToy)
    return updatedToy
  }

  fetchToys()

  // adding a new toy
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
      appendToy(newToy)
      toyForm.reset()
      toyFormContainer.style.display = "none"
      addToy = !addToy
    })

  })
});