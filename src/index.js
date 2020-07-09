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
});

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(res => add_toys(res))

function add_toys(toys){
 toys.forEach(toy => {
  add_toy(toy)
 })
}

function add_toy(toy){
  const toys_div = document.querySelector("#toy-collection")
  const toy_div = document.createElement("div")
  toy_div.classList.add("card")
  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  const image = document.createElement("img")
  image.src = toy.image
  image.classList.add("toy-avatar")
  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes `
  const btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.innerText = "Like <3"
  btn.addEventListener("click", () => {
    // console.log("clicked!") 

    add_likes(toy, p)
  })

  toy_div.append(h2, image, p, btn)
  toys_div.append(toy_div)
}

function add_likes (toy, p){
  let new_number = parseInt(p.innerText.split(" ")[0], 10) + 1
  let formData = {
    likes: new_number
  };
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };  

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(
    res => res.json()
  ).then(
    function(json) {
      console.log(json.likes)
      p.innerText = `${json.likes} Likes`
  }
  )

  // );
}



let f = document.querySelector(".add-toy-form")

f.addEventListener("submit", function(e){
  e.preventDefault()
  let name = f.elements[0].value
  let image = f.elements[1].value
  let formData = {
    name,
    image,
    likes: 0
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
          return response.json();
      }).then(function(obj){
        add_toy(obj)
      });
    
})