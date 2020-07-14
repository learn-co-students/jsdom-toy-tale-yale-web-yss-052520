let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toysDiv = document.querySelector('div#toy-collection')
  const toyForm = document.querySelector('form.add-toy-form')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  function qs(selector) {
    return document.querySelector(selector)
  }

  function ce(element) {
    return document.createElement(element)
  }

  const url = `http://localhost:3000/toys`

  function fetchToys() {
     fetch(`http://localhost:3000/toys`)
     .then(res => res.json())
     .then(json => showToys(json))
  }

  function showToys(toys) {
    toys.forEach(toy => appendToy(toy))
  } 
  function appendToy(toy) {
  let div = ce('div')
  div.className = 'card'
  let img = ce('img')
  img.src = toy.image
  img.className = "toy-avatar"
  let h2 = ce('h2')
  h2.innerText = toy.name 
  let para = ce('p')
  para.innerText = `${toy.likes} likes`
  let btn = ce('button')
  btn.innerText = 'Like'
  btn.class = "like-btn"


  function buttonClick(toy) {
    let likes = toy.likes + 1
    return likes 
  }

  btn.addEventListener('click', async () => {
  toy = await addLikes(toy, para)
  para.innerText = toy.likes + ' Likes'
  })

    // const configObject = {
    //   method: 'PATCH',
    //   headers: {
    //     "Content-Type": "application/json",
    //     'Accept': "application/json"      
    //   },
    //   body: JSON.stringify({
    //     likes: buttonClick(toy)
    //   })
    // }

    // fetch(url + '/' + toy.id, configObject)
    // .then(res => res.json())
    // .then(toy => {
    //   para.innerText = `${toy.likes} Likes` 
    // })
  
  

  
  div.append(img, h2, para, btn)

  
  toysDiv.append(div)
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

  toyForm.addEventListener("submit", () => {
    event.preventDefault()
    // debugger
    let name = event.target[0].value
    let image_url = event.target[1].value 

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Accept': "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image_url,
        "likes": 0
      })
    } 
    fetch(url, configObj)
    .then(res => res.json())
    .then(newToy => {
      appendToy(newToy)
      toyForm.reset()
      toyFormContainer.style.display = "none"
      addToy = !addToy
    })
    


    
  });


})