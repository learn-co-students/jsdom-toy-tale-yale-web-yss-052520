let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  function qs(selector){
    return document.querySelector(selector)
  }
  function ce(element){
    return document.createElement(element)
  }
  const addBtn = qs("#new-toy-btn");
  const toyFormContainer = qs(".container");
  const toys = qs("#toy-collection")
  const toyForm = qs(".add-toy-form")
  const url = "http://localhost:3000/toys"


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(url)
    .then(response => response.json())
    .then(json => createCollection(json))

  toyForm.addEventListener("submit", () => {
    event.preventDefault()
    fetch(url, {
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
    .then(json => showToy(json))
  })

  function likes(toy, btn) {
    const id_url = `${url}/${toy.id}`
    btn.addEventListener('click', () => {
      fetch(id_url, {
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

  function showToy(json){
    let div = ce("div")
    div.className = "card"

    let h2 = ce("h2")
    h2.innerText = json.name

    let img = ce("img")
    img.src = json.image
    img.className = "toy-avatar"

    let p = ce("p")
    p.innerText = `${json.likes} Likes`

    let btn = ce("button")
    btn.class = "like-btn"
    btn.innerText = "Like <3"
    likes(json, btn)

    div.append(h2, img, p, btn)
    toys.append(div)
  }

  function createCollection(toys) {
    toys.forEach(toy => {
      showToy(toy)
    });
  }

})


