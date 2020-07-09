let addToy = false;

function ce(element){
	return document.createElement(element)
}

function qs(identifier){
	return document.querySelector(identifier)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = qs("#toy-collection")
  const toyForm = qs("form.add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = toyForm[0].value
    const url = toyForm[1].value

    let configObj = {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        name: name, // if they're the same you can just say `title,`
        image: url,
        likes: 0,
      })
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then(newToy => {
      showToy(newToy)
      toyForm.reset()
    })

  })

  function showToy(toy){
    const div = ce("div")
    div.class = "card"
    div.style.border = "1px solid"

    const h2 = ce("h2")
    h2.innerText = toy.name

    const img = ce("img")
    img.src = toy.image

    const likes = ce("p")
    likes.innerText = `${toy.likes} likes`

    const btn = ce("button")
    btn.innerText = "Like <3"
    btn.class = "like-btn"


    btn.addEventListener("click", function(){addLike(toy)})
    

    div.append(h2, img, likes, btn)

    toyCollection.append(div)

    function addLike(toy){

      // div.deleteChildren()

      let configObj = {
        method: "PATCH",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify({
          likes: toy.likes + 1
        })
      }

      fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        likes.innerText = `${toy.likes + 1} likes`
        debugger

      })
      
      
    }



  }


  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      showToy(toy)
    })
  })






});
