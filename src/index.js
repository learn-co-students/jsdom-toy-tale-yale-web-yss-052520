let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  function qs(selector){
    return document.querySelector(selector)
  } 

  function ce(element){
    return document.createElement(element)
  }

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = qs("div#toy-collection")
  const form = qs("form.add-toy-form")



  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function fetchToys(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => displayToys(toys))
  }

  function displayToys(toys){
    toys.forEach(toy => {
      makeToy(toy)
    })
  }

  function makeToy(toy){
    toyDiv = ce("div")
    toyDiv.className = "card"

    let h2 = ce("h2")
    h2.innerText = toy.name

    let img = ce("img")
    img.src = toy.image
    img.className = "toy-avatar"

    let p = ce("p")
    p.innerText = toy.likes + " Likes"

    let btn = ce("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"

    btn.addEventListener("click", ()=> { 
      fetch("http://localhost:3000/toys/" + toy.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes + 1
        })
      })  
      .then(res => res.json())
      .then(updatedToy => {
        p.innerText = updatedToy.likes + " Likes"
        toy = updatedToy
      })  
    
        


    })  

    toyDiv.append(h2, img, p, btn)
    toyCollectionDiv.append(toyDiv)

  }

  fetchToys()

  form.addEventListener("submit", function(){
    event.preventDefault()
    let name = event.target[0].value
    let image = event.target[1].value
    let likes = 0
  
    let configObj = {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: likes
      })
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then(newToy => {
        makeToy(newToy)
        form.reset()
    })
  })
});


































// const toyDiv = document.querySelector("#toy-collection")
// const toyForm = document.querySelector(".add-toy-form")
//   function ce(element){
//     return document.createElement(element)
//   }

//   function fetchToys() {
//       return fetch('http://localhost:3000/toys')
//         .then(res => res.json())
//         // .then(console.log)
//         .then(toys => showToys(toys))
//     }
  
// //   function showToys(toys){
// //     toys.forEach(toy => addToy(toy))
// //   }

// //   function addToy(toy){
// //     const div = ("div")
// //     div.className = "card"

// //     const h2 = ce("h2")
// //     h2.innerText = toy.name

// //     const img = ce("img")
// //     img.src = toy.image
// //     img.className = "toy-avatar"

// //     const p = ce("p")
// //     p.innerText = toy.likes + " Likes" //can also use string interpolation
// //     // `${toy.likes} Likes`

// //     const btn = ce("button")
// //     btn.className = "Like-btn"
// //     btn.innerText = "Like <3"

// //     // add likes
// //     btn.addEventListener("click", () => {
// //       addLikes(toy, p)
// //       fetch('http://localhost:3000/toys'+toy.id, {
// //         method: 'PATCH',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         //where do we get JSON from? why is it capitalized?
// //         body: JSON.stringify({
// //           likes: toy.likes + 1
// //         })
// //       })
// //       .then(res => res.json())
// //       .then(updatedToy => {
// //         p.innerText = updatedToy.likes + " Likes"
// //         return updatedToy
// //       })
      

// //     })
    
      
// //     }
// //     div.append(h2, img, p, btn)
// //     toyDiv.append(div)
  

//     fetchToys()


//     toyForm.addEventListener("submit", () => {
//       event.preventDefault()
//       debugger

// //       let name = event.target[0].value
// //       let url = event.target[1].value

// //       fetch('http://localhost:3000/toys', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Accept: "application/json"
// //         },
// //         //where do we get JSON from? why is it capitalized?
// //         body: JSON.stringify({
// //           "name": name,
// //           "image": url,
// //           "likes": 0
// //       })
// //     })    
// //     .then(res => res.json())
// //     .then(newToy => {
// //       addToy(newToy)
// //       toyForm.reset()
// //       toyFormContainer.style.display = "none";
// //       addToy = !addToy
// //     })

//     })
// });



// // // how do we test that this works? when is this complete? where do we add to the Div?
// // 

// // getToys().then(toys => {
// //   toys.forEach(toy => {
// //     createToys(toy)
// //   })
// // })

// // // done with createToys()
// // // function loadToys(json) {
// // //   const toys = json.message
// // //   toys.forEach(toy => {
// // //       const toyTag = document.createElement('div')
// // //       divCollector.append(toyTag)
// // //   }) 
// // // }

// // function postToy(toy_data) {
// //   fetch('http://localhost:3000/toys', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Accept: "application/json"
// //       },
// //       //where do we get JSON from? why is it capitalized?
// //       body: JSON.stringify({
// //         "name": toy_data.name.value,
// //         "image": toy_data.image.value,
// //         "likes": 0

// //       })
// //     })
// //     .then(res => res.json())
// //     //obj_toy is not predefined, correct?
// //     .then((obj_toy) => {
// //       let new_toy = renderToys(obj_toy)
// //       divCollect.append(new_toy)
// //     })
// // }
// // // am I naming these functions correctly?
// // function createToys(toy) {
// //   let h2 = document.createElement('h2')
// //   h2.innerText = toy.name

// //   let img = document.createElement('img')
// //   img.setAttribute('src', toy.image)
// //   img.setAttribute('class', 'toy-avatar')

// //   let p = document.createElement('p')
// //   p.innerText = `${toy.likes} likes`

// //   let btn = document.createElement('button')
// //   btn.setAttribute('class', 'like-btn')
// //   btn.setAttribute('id', toy.id)
// //   btn.innerText = "like"
// //   btn.addEventListener('click', (e) => {
// //     console.log(e.target.dataset);
// //     likes(e)
// //   })

// //   let divCard = document.createElement('div')
// //   divCard.setAttribute('class', 'card')
// //   divCard.append(h2, img, p, btn)
// //   divCollect.append(divCard)
// // 